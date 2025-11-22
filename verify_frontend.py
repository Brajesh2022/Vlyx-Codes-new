
from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Mock the API endpoints
    def handle_chat(route):
        route.fulfill(
            status=200,
            content_type="application/json",
            body='{"candidates": [{"content": {"parts": [{"text": "Hello! <script>alert(1)</script> **Bold**"}]}}]}'
        )

    page.route("**/api/chat", handle_chat)

    # 1. Load the page
    page.goto("http://localhost:8080/index.html")
    time.sleep(2) # Wait for initial animations

    # 2. Test Chat with XSS Injection in response
    # Click the Luna Chat trigger
    page.click("#luna-trigger")
    time.sleep(1)

    # Type a message
    page.fill("#luna-input", "Hello")
    page.click("button[type='submit']")

    # Wait for response to appear
    page.wait_for_selector("#luna-messages .chat-msg:nth-child(3)") # 1=Initial, 2=User, 3=AI

    # Check HTML content
    chat_msgs = page.locator("#luna-messages")
    content = chat_msgs.inner_html()
    print("Chat HTML content:", content)

    if "<script>" in content:
        print("FAIL: Script tag found!")
    else:
        print("PASS: Script tag sanitized.")

    # Take screenshot of Chat
    page.screenshot(path="verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
