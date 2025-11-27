// Shared Project Data
const projects = [
    {
        title: "NetVlyx",
        category: "Streaming",
        desc: "A fast, ad-free movie streaming web app. Browse and download publicly available content with zero interruptions. Built using advanced scraping techniques to ensure content availability without hosting files directly.",
        tech: ["Next.js", "Cloudflare Workers", "Firebase", "Web Scraping"],
        image: "images/Netvlyx.webp",
        link: "netvlyx.html",
        color: "text-red-500",
        hoverBorder: "hover:border-red-500/40"
    },
    {
        title: "Book.vlyx",
        category: "Education",
        desc: "The internet's largest free library. We believe education should be accessible to everyone. This platform aggregates millions of free ebooks from various sources into a clean, ad-free interface for students.",
        tech: ["Next.js", "Cloudflare Workers", "GitHub CMS", "Scraping"],
        image: "images/Book-vlyx.webp",
        link: "book-vlyx.html",
        color: "text-blue-500",
        hoverBorder: "hover:border-blue-500/40"
    },
    {
        title: "FireVlyx",
        category: "Dev Tools",
        desc: "A browser-based deployment tool that eliminates command-line setups. Deploy your websites directly to Firebase Hosting or Vercel using a drag-and-drop interface or by connecting your GitHub repo.",
        tech: ["Next.js", "Firebase API", "GitHub API", "Vercel"],
        image: "images/FireVlyx.webp",
        link: "firevlyx.html",
        color: "text-yellow-500",
        hoverBorder: "hover:border-yellow-500/40"
    },
    {
        title: "Vlyx.mod",
        category: "Storefront",
        desc: "A specialized digital storefront for organizing and displaying Mod APKs. Features a clean UI and automated data gathering to keep app versions up to date.",
        tech: ["Next.js", "Cloudflare Workers", "Web Scraping", "Vercel"],
        image: "images/vlyx-mod.webp",
        link: "vlyx-mod.html",
        color: "text-green-400",
        hoverBorder: "hover:border-green-500/40"
    },
    {
        title: "Vlyx.ide",
        category: "AI Tools",
        desc: "A prompt-based code generation tool. Simply describe what you want in natural language, and Vlyx.ide generates downloadable, ready-to-run code packages. No setup required.",
        tech: ["Remix", "Bolt.new Open Source", "Cloudflare", "AI API"],
        image: "images/Vlyx-ide.webp",
        link: "vlyx-ide.html",
        color: "text-purple-400",
        hoverBorder: "hover:border-purple-500/40"
    },
    {
        title: "AniVlyx",
        category: "Entertainment",
        desc: "An anime streaming platform built under the Vlyx ecosystem. Our mission: No ads on the internet. It scrapes anime content to serve users a premium, interruption-free viewing experience.",
        tech: ["React (Vite)", "Cloudflare Workers", "Cloudflare Pages"],
        image: "images/anivlyx_bg.webp",
        link: "anivlyx.html",
        color: "text-pink-500",
        hoverBorder: "hover:border-pink-500/40"
    },
    {
        title: "DPS Keoti",
        category: "Institutional",
        desc: "A comprehensive school website with a custom-built admission system. Features an auto-updating video gallery (via YouTube RSS) and generates professional, printable admission receipts for parents.",
        tech: ["Next.js Static", "YouTube RSS", "Google Forms", "Firebase"],
        image: "images/dps-keoti-new.webp",
        link: "dps.html",
        color: "text-green-500",
        hoverBorder: "hover:border-green-500/40"
    },
    {
        title: "DPS Dashboard",
        category: "Management",
        desc: "A secure internal dashboard for DPS Keoti staff and administration. Handles student data management, fee tracking, and operational logistics securely using Firestore.",
        tech: ["Next.js", "Firestore", "Auth"],
        image: "images/dps-keoti-new.webp",
        link: "dps.html",
        color: "text-emerald-400",
        hoverBorder: "hover:border-emerald-500/40"
    },
    {
        title: "Luna AI",
        category: "Assistant",
        desc: "The intelligent brain behind Vlyx Codes. Luna is an integrated AI assistant accessible via the floating button on our homepage, ready to guide users through our ecosystem.",
        tech: ["Next.js", "LLM Integration", "Vercel AI SDK"],
        image: "images/luna-ai.webp",
        link: "luna.html",
        color: "text-indigo-400",
        hoverBorder: "hover:border-indigo-500/40"
    },
    {
        title: "Ekagra Academy",
        category: "Client Work",
        desc: "A highly optimized WordPress website for a coaching institute in Darbhanga. Focused on local SEO ranking and providing a smooth information flow for prospective students.",
        tech: ["WordPress", "PHP", "SEO"],
        image: "images/Ekagra.webp",
        link: "ekagra.html",
        color: "text-orange-400",
        hoverBorder: "hover:border-orange-500/40"
    }
];
