// import { usePathname, useRouter } from "next/navigation";

 import { useLocation, useNavigate } from 'react-router-dom';
export const SidebarItem = ({ href, title, icon }) => {

    // const router = useRouter();
     const location = useLocation();
     const selected = location.pathname === href
     const navigate = useNavigate();




    return <div className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer  p-2 pl-8`} onClick={() => {
        //router.push(href);
        console.log("href",href);
        navigate(href);

    }}>
        <div className="pr-2">
            {icon}
        </div>
        <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
            {title}
        </div>
    </div>
}