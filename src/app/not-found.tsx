import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-ink text-cream font-display">
            <h2 className="text-4xl text-crimson mb-4">404 - Page Not Found</h2>
            <p className="mb-8 text-xl">Could not find requested resource</p>
            <Link href="/" className="btn-persona px-8 py-4 bg-crimson text-cream border-4 border-ink">
                <span className="btn-persona-text">Return Home</span>
            </Link>
        </div>
    )
}
