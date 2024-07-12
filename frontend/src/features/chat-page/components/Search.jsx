import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { SearchUserRequest } from "../api/chatApi";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 300px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const SearchResults = styled.ul`
  list-style: none;
  padding: 0;
`;

const ResultItem = styled.li`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isFetching, refetch } = SearchUserRequest(searchTerm);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length >= 3) {
      refetch();
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search users by email..."
      />
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <SearchResults>
          {data?.map((user) => (
            <ResultItem key={user.id}>{user.email}</ResultItem>
          ))}
        </SearchResults>
      )}
    </SearchContainer>
  );
};

export default Search;
