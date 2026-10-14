import api from "../../api/api";

export const isLoading = (loading = true) => {
    return {
        type: "IS_LOADING",
        payload: loading
    }
}

export const isError = (error) => {
    return {
        type: "IS_ERROR",
        payload: error?.response?.data?.message || "Something went wrong"
    }
}

export const authenticateSignInUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);

        const { data } = await api.post("/auth/login", sendData);

        dispatch({
            type: "LOGIN",
            payload: data
        })

        localStorage.setItem("auth", JSON.stringify(data));
        setLoader(false);
        reset();
        toast.success("Login successful");
        navigate("/dashboard");

    } catch (error) {
        setLoader(false);
        toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
        setLoader(false);
    }
}

export const logoutUser = (toast, navigate) => async (dispatch) => {
    try {
        await api.post("/auth/logout");

        dispatch({
            type: "LOGOUT",
        });

        toast.success("Logout successful");
        navigate('/login');

        localStorage.removeItem("auth");
    } catch (error) {
        console.log(error);
    }
}