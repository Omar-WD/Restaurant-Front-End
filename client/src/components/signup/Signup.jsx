import { useForm } from "react-hook-form";
import { useContext } from "react";
import { OrderContext } from "../../context/OrderProvider";
import { Navigate } from "react-router-dom";

export default function Signup() {
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {signup,isLoading,user} = useContext(OrderContext)

  const onsubmit = (data) => {
   signup(data)
  };

  if(!isLoading && user){
    return <Navigate to="/"/>
  }
  if(!isLoading && !user){
    return (
      <div className="py-28 bg-amber-800 h-screen flex flex-col justify-start gap-6 ">
        <h1 className=" text-4xl text-white">Signup</h1>
        <form onSubmit={handleSubmit(onsubmit)} className=" flex flex-col justify-around items-center gap-3">
          <input className="p-2 w-60 rounded-md"
            type="text"
            placeholder="username"
            {...register("username", { required: true })}
          />
          {errors.name && <span>This field is required</span>}
          <input className="p-2 w-60 rounded-md"
            type="text"
            placeholder="name"
            {...register("name", { required: true })}
          />
          {errors.name && <span>This field is required</span>}
          <input
          className="p-2 w-60 rounded-md"
            type="password"
            placeholder="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
          <input
            className="p-1 mt-2 w-52 rounded-md bg-amber-500 text-white border-[#ffffff87] border-2"
          type="submit" />
        </form>
      </div>
    );
  }

}
