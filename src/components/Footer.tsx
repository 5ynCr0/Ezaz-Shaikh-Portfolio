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
                        className="text-crimson hover:text-cream transition-colors"
                    >
                        Shubham
                    </a>
                    {" "}· © Copyright Ezaz Shaikh
                </p>
            </div>
        </footer>
    );
}
