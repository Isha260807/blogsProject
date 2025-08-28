import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Spinner from "./Spinner";


const Blogs = () => {

    //consuming-->useContext hook
    const {posts,loading} = useContext(AppContext);

//"bg-[#1E3E62]"
    return (
        <div className="flex flex-col w-11/12 max-w-[550px] gap-y-7 py-3 mt-[67px] mb-[70px]">
           {
            loading ? 

            (<Spinner/>) : 

            (
                posts.length === 0 ? 
                (<div>
                    <p>No Post Found</p>
                </div>) :
                (posts.map( (post) =>(
                    <div key={post.id}>
                        <p className="font-bold text-lg">{post.title}</p>

                        <p className="text-[12px] ">
                            By <span className="italic text-slate-500">{post.author}</span> on <span className="underline font-bold ">{post.category}</span>
                        </p>

                        <p className="text-[12px] ">
                            Posted on {post.date}
                        </p>

                        <p className="text-sm mt-[10px]">{post.content}</p>

                        <div className="flex gap-x-3">
                            {post.tags.map( (tag ,index ) => {
                                return <span key={post.index} className="text-blue-700 underline font-bold text-[10px] ">{`#${tag}`}</span>
                            })}
                        </div>

                    </div>
                )))
            )
           }
        </div>
    )
}

export default Blogs