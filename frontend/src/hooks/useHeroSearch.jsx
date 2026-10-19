import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

export const useHeroSearch = (onSearch) => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch?.(query.trim());
    };

    const handleQuickSearch = (term) => {
        setQuery(term);
        onSearch?.(term);
    };

    const handleSearchJob = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return { query, handleChange, handleSubmit, handleQuickSearch, handleSearchJob };
};
