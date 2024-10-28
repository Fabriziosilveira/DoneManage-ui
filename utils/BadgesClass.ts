export function getBadgeClass(input: string){
    switch (input.toLocaleLowerCase()) {
        case "sufficient":
            return "bg-[#C2FAF6] text-[#2507DE]";    
        case "insufficient":
            return "bg-[#FFD0D0] text-[#B71904]";
        case "completed":
            return "bg-[#D7FFD0] text-[#0C8C09]";
        case "ongoing":
            return "bg-[#FFF9D4] text-[#C9981B]";
        case "canceled":
            return "bg-[#FFDFDF] text-[#8C0909]";
        case "approved":
            return "bg-[#D0F4FF] text-[#093E8C]";
        case "returned":
            return "bg-[#FFE7D0] text-[#B6491A]";
        case "pending":
            return "bg-[#FBF5C4] text-[#8B5401]";
        default:
            return "bg-pink";
    }   
}