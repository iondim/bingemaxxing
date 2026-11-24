export function getStatusLabel(category, status){
    const normalizedCategory = (category || "").toLowerCase();
    const isBook= normalizedCategory.includes("book");

    if (status === "completed"){
        return isBook? "Read" : "Watched"; 
    }

    return isBook ? "To be Read" : "To be watched" ;
}