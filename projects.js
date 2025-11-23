// Shared Project Data
const projects = [
    {
        title: "NetVlyx",
        category: "Streaming",
        desc: "A fast, ad-free movie streaming web app. Browse and download publicly available content with zero interruptions. Built using advanced scraping techniques to ensure content availability without hosting files directly.",
        tech: ["Next.js", "Cloudflare Workers", "Firebase", "Web Scraping"],
        image: "https://images.unsplash.com/photo-1574375927938-d5a98e8efe85?auto=format&fit=crop&w=800&q=80",
        link: "netvlyx.html",
        color: "text-red-500",
        hoverBorder: "hover:border-red-500/40"
    },
    {
        title: "Book.vlyx",
        category: "Education",
        desc: "The internet's largest free library. We believe education should be accessible to everyone. This platform aggregates millions of free ebooks from various sources into a clean, ad-free interface for students.",
        tech: ["Next.js", "Cloudflare Workers", "GitHub CMS", "Scraping"],
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        link: "book-vlyx.html",
        color: "text-blue-500",
        hoverBorder: "hover:border-blue-500/40"
    },
    {
        title: "FireVlyx",
        category: "Dev Tools",
        desc: "A browser-based deployment tool that eliminates command-line setups. Deploy your websites directly to Firebase Hosting or Vercel using a drag-and-drop interface or by connecting your GitHub repo.",
        tech: ["Next.js", "Firebase API", "GitHub API", "Vercel"],
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
        link: "firevlyx.html",
        color: "text-yellow-500",
        hoverBorder: "hover:border-yellow-500/40"
    },
    {
        title: "Vlyx.mod",
        category: "Storefront",
        desc: "A specialized digital storefront for organizing and displaying Mod APKs. Features a clean UI and automated data gathering to keep app versions up to date.",
        tech: ["Next.js", "Cloudflare Workers", "Web Scraping", "Vercel"],
        image: "https://images.unsplash.com/photo-1556656793-0245244a4048?auto=format&fit=crop&w=800&q=80",
        link: "vlyx-mod.html",
        color: "text-green-400",
        hoverBorder: "hover:border-green-500/40"
    },
    {
        title: "Vlyx.ide",
        category: "AI Tools",
        desc: "A prompt-based code generation tool. Simply describe what you want in natural language, and Vlyx.ide generates downloadable, ready-to-run code packages. No setup required.",
        tech: ["Remix", "Bolt.new Open Source", "Cloudflare", "AI API"],
        image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=800&q=80",
        link: "vlyx-ide.html",
        color: "text-purple-400",
        hoverBorder: "hover:border-purple-500/40"
    },
    {
        title: "AniVlyx",
        category: "Entertainment",
        desc: "An anime streaming platform built under the Vlyx ecosystem. Our mission: No ads on the internet. It scrapes anime content to serve users a premium, interruption-free viewing experience.",
        tech: ["React (Vite)", "Cloudflare Workers", "Cloudflare Pages"],
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop",
        link: "anivlyx.html",
        color: "text-pink-500",
        hoverBorder: "hover:border-pink-500/40"
    },
    {
        title: "DPS Keoti",
        category: "Institutional",
        desc: "A comprehensive school website with a custom-built admission system. Features an auto-updating video gallery (via YouTube RSS) and generates professional, printable admission receipts for parents.",
        tech: ["Next.js Static", "YouTube RSS", "Google Forms", "Firebase"],
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
        link: "dps.html",
        color: "text-green-500",
        hoverBorder: "hover:border-green-500/40"
    },
    {
        title: "DPS Dashboard",
        category: "Management",
        desc: "A secure internal dashboard for DPS Keoti staff and administration. Handles student data management, fee tracking, and operational logistics securely using Firestore.",
        tech: ["Next.js", "Firestore", "Auth"],
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
        link: "dps.html",
        color: "text-emerald-400",
        hoverBorder: "hover:border-emerald-500/40"
    },
    {
        title: "Luna AI",
        category: "Assistant",
        desc: "The intelligent brain behind Vlyx Codes. Luna is an integrated AI assistant accessible via the floating button on our homepage, ready to guide users through our ecosystem.",
        tech: ["Next.js", "LLM Integration", "Vercel AI SDK"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
        link: "luna.html",
        color: "text-indigo-400",
        hoverBorder: "hover:border-indigo-500/40"
    },
    {
        title: "Ekagra Academy",
        category: "Client Work",
        desc: "A highly optimized WordPress website for a coaching institute in Darbhanga. Focused on local SEO ranking and providing a smooth information flow for prospective students.",
        tech: ["WordPress", "PHP", "SEO"],
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
        link: "ekagra.html",
        color: "text-orange-400",
        hoverBorder: "hover:border-orange-500/40"
    }
];
