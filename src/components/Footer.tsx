"use client";

export default function Footer() {
    return (
        <footer className="py-8 border-t-4 border-crimson">
            <div className="container mx-auto px-8 text-center">
                <p className="text-cream/50 font-display tracking-widest">
                    Designed and developed by{" "}
                    <a
                        href="https://www.shubhamsinghania.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-crimson hover:text-cream transition-all inline-block hover:scale-110"
                    >
                        Shubham
                    </a>
                    {" "}· © Copyright <a href="https://www.linkedin.com/in/ezazxshaikh/" target="_blank" rel="noopener noreferrer" className="text-cream hover:text-crimson transition-all inline-block hover:scale-110">Ezaz Shaikh</a>
                </p>
            </div>
        </footer>
    );
}
