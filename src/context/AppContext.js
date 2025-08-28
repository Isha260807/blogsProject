import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";

//step-1-->creation

export const AppContext = createContext(); //creation of context

//step-2-->provider-->children is a by default(means all data or components inside AppContextProvider )
export default function AppContextProvider({children}) {
    const [loading ,setLoading] = useState(false);
    const [posts,setPosts] = useState([]);
    const [page , setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(null);

    //data filling--by Api Call

    async function fetchBlogsPosts(page = 1){
        setLoading(true);

        let url = `${baseUrl}?page=${page}`;

        try{
           const result = await fetch(url);
           const data = await result.json();
           console.log(data);
           setPage(data.page);
           setPosts(data.posts);
           setTotalPages(data.totalPages);
        }
        catch(error){
           alert("error in fetchinng data");
           setPage(1);
           setPosts([]);
           setTotalPages(null);
        }
        setLoading(false);
    }

    //handle the page increment decrement by previous and next btn
    function handlePageChange(page){

        setPage(page);
        fetchBlogsPosts(page);
    }

    //value-->it is an object which have all data
    const value = {
        posts,
        setPosts,
        loading,
        setLoading,
        page,
        setPage,
        totalPages,
        setTotalPages,
        fetchBlogsPosts,
        handlePageChange
        
    };

    //return AppContextProvider-->see the syntax
    //here all the data will share to the app.js through value by children

    //step-2-->provider
    return<AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

