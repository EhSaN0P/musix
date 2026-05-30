 
export default function PlayerBackground({ colors }) {
    return (
        <>
            {/* گوی‌های رنگی داینامیک متحرک */}
            <div className="absolute inset-0 -z-20 bg-neutral-950 overflow-hidden">
                <div
                    className="absolute top-[-10%] left-[-10%] w-[80%] h-[60%] rounded-full opacity-40 blur-[100px] animate-float-1 transition-colors duration-1000"
                    style={{ backgroundColor: colors.primary }}
                />
                <div
                    className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[60%] rounded-full opacity-35 blur-[100px] animate-float-2 transition-colors duration-1000"
                    style={{ backgroundColor: colors.secondary }}
                />
            </div>
            {/* لایه شیشه‌ای اصلی */}
            <div className="absolute inset-0 -z-10 bg-white/[0.03] backdrop-blur-2xl border border-white/10" />
        </>
    );
}