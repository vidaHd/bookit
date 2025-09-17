import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:5000/profile";

const useProfileData = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const formData = new FormData();
      if (data.avatar) formData.append("avatar", data.avatar);

      formData.append(
        "profile",
        JSON.stringify({
          description: data.description,
          age: data.age,
          gender: data.gender,
        })
      );
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: formData,
      });

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      return res.json();
    },
  });

  return { mutation, profileQuery };
};

export default useProfileData;
