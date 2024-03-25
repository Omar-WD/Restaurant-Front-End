import { useForm } from "react-hook-form";
import axiosClient from "../../axiosClient";
import { useNavigate } from "react-router-dom";

export default function ProductForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image[0]);

    axiosClient
      .post("/categories", formData)
      .then(() => {
        navigate(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-20 px-5">
      <input
        placeholder="category_name"
        type="text"
        {...register("name", { required: true })}
      />
      {errors.name && <span>This field is required</span>}
      <input
        placeholder="product_Image"
        type="file"
        {...register("image", { required: true })}
      />
      {errors.image && <span>This field is required</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
