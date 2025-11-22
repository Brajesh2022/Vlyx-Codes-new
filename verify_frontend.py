
from playwright.sync_api import sync_playwright
import time
import os

def verify_interactions():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the page
        page.goto("http://localhost:8080/index.html")

        # Wait for page to load
        page.wait_for_timeout(1000)

        # 1. Test Project Modal
        print("Testing Project Modal...")
        # Click the first project card
        page.click('.project-card')

        # Wait for animation
        page.wait_for_timeout(1000)

        # Take screenshot of open modal
        page.screenshot(path="verification_modal_open.png")
        print("Modal Open screenshot taken.")

        # Close modal
        page.click('#project-modal .fa-xmark')

        # Wait for close animation
        page.wait_for_timeout(1000)

        # 2. Test AI Chat
        print("Testing AI Chat...")
        # Click chat trigger
        page.click('#luna-trigger')

        # Wait for animation
        page.wait_for_timeout(1000)

        # Take screenshot of open chat
        page.screenshot(path="verification_chat_open.png")
        print("Chat Open screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_interactions()
