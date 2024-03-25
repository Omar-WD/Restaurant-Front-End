// import { useForm } from "react-hook-form"
// import axiosClient from "../../axiosClient"
// import { useParams,useNavigate } from "react-router-dom";
// import { FaPlus } from "react-icons/fa6";

// export default function ProductForm() {
//     const {categoryID} =useParams();
//     const navigate = useNavigate();
//     const { register, handleSubmit, formState: { errors },reset } = useForm()
    
    

//     const onSubmit = (data) => {
//         const formData = new FormData()
//         formData.append('name',data.name)
//         formData.append('price',data.price)
//         formData.append('category',categoryID)
//         formData.append('image',data.image[0])

//         axiosClient.post('/products',formData)
//         .then(() => {
//             navigate(`/products/${categoryID}`)
//         })
//         .catch(err => {
//             console.log(err)
//         })
//         reset()
//     }
//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className=" text-black">
//         <input placeholder="product_name" type="text" {...register("name",{required:true})} />
//         {errors.name && <span>This field is required</span>}
//         <input placeholder="product_price" type="text" {...register("price",{required:true})} />
//         {errors.price && <span>This field is required</span>}
//         <div className="flex flex-row">
//         <input type="checkbox" name="" id="" {...register("optionCheckbox")} />
//         <input placeholder="option_name" type="text" {...register("optionName")} />
//         <input placeholder="option_price" type="text" name="" id="" {...register("optionPrice")} />
//         <FaPlus />
//         </div>
//         <div className="flex flex-row">
//         <input type="checkbox" name="" id="" {...register("optionCheckbox")} />
//         <input placeholder="option_name" type="text" {...register("optionName")} />
//         <input placeholder="option_price" type="text" name="" id="" {...register("optionPrice")} />
//         <FaPlus />
//         </div>
//         <input placeholder="product_Image" type="file" {...register("image",{required:true})} />
//         {errors.image && <span>This field is required</span>}
//         <button type="submit">Submit</button>
//     </form>
//   )
// }

//***********************************************************************8 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../../axiosClient";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

export default function ProductForm() {
    const { categoryID } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [options, setOptions] = useState([{ checked: false, name: "", price: "" }]);

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('category', categoryID);
        formData.append('image', data.image[0]);
    
        const selectedOptions = options.filter(option => option.name !== "");
        formData.append('options', JSON.stringify(selectedOptions));
    
        axiosClient.post('/products', formData)
            .then(() => {
                navigate(`/products/${categoryID}`);
            })
            .catch(err => {
                console.log(err);
            });
        reset();
    };
    
    

    const handleAddOption = () => {
        setOptions([...options, { checked: false, name: "", price: "" }]);
    };

    const handleOptionChange = (index, field, value) => {
        const newOptions = [...options];
        newOptions[index][field] = value;
        setOptions(newOptions);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="text-black pt-10">
            <input placeholder="product_name" type="text" {...register("name", { required: true })} />
            {errors.name && <span>This field is required</span>}
            <input placeholder="product_price" type="text" {...register("price", { required: true })} />
            {errors.price && <span>This field is required</span>}

            {options.map((option, index) => (
                <div className="flex flex-row" key={index}>
                    <input type="checkbox" checked={option.checked} onChange={(e) => handleOptionChange(index, 'checked', e.target.checked)} />
                    <input type="text" placeholder="option_name" value={option.name} onChange={(e) => handleOptionChange(index, 'name', e.target.value)} />
                    <input type="text" placeholder="option_price" value={option.price} onChange={(e) => handleOptionChange(index, 'price', e.target.value)} />
                    {index === options.length - 1 && <FaPlus onClick={handleAddOption} />}
                </div>
            ))}

            <input placeholder="product_Image" type="file" {...register("image", { required: true })} />
            {errors.image && <span>This field is required</span>}
            <button type="submit">Submit</button>
        </form>
    );
}
