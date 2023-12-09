import Image from 'next/image'
import {MainGrid} from "@/components/MainGrid";
import PublicationInfo from "@/app/PublicationInfo";
import PropertyInfo from "@/app/PropertyInfo";

export default function Home() {
    return (<main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p style={{'font-size': '48px', 'margin-bottom': '16px'}}>GNoMExplorer</p>
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <MainGrid/>
            </div>
            <div className="mt-4">
                <PropertyInfo/>
            </div>
            <div className="mt-4">
                <PublicationInfo/>
            </div>
        </main>)
}
