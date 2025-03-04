import Link from "next/link";
export default function Footer() {
    return(
<div id= "section footer">
    <div className= "text-center py-4">
    <Link href="/privacy" target="_blank" className="btn btn-link">Privacy</Link>
    <span>|</span>
    <Link href="/terms" target="_blank" className="btn btn-link">Terms</Link>
    <span>|</span>
    <Link href="/contact us" target="_blank" className="btn btn-link">Contact Us</Link>

    <p> Copyright 2025, Local Skills Hub. All Rights Reserved.</p>
    
    </div>

</div>
    )
}

