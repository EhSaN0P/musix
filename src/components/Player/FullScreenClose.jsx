 import { Minimize2 } from 'lucide-react';

export default function FullScreenClose({ onClose }) {
    return (
        <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition z-50 text-white border border-white/10"
        >
            <Minimize2 size={18} />
        </button>
    );
}