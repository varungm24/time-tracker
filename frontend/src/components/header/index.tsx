import React, { useState } from "react";
import Icon from "../../icons";
import Text from "../text";
import { Input, SearchInputWrapper } from "../index";

interface HeaderProps {
  pageTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }: any) => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center flex-1 w-full mb-[60px]">
        <Text className="text-3xl font-bold" style={{ color: "#3A3B3F" }}>
          {pageTitle}
        </Text>
        <div className="flex flex-row items-center gap-[80px]">
          <SearchInputWrapper handleSelect={(e: any) => {}} field="name">
            <Input
              id="contentCreation_input_productType"
              placeholder="search"
              onChange={(event: { target: { value: any } }) => {}}
              iconLeft={
                <Icon
                  name="searchIcon"
                  height={12}
                  width={12}
                  color="#c1bfc1"
                />
              }
              inputStyle={{ paddingLeft: "30px" }}
              style={{ width: 280, height: 30 }}
            />
          </SearchInputWrapper>
          <div className="flex flex-row items-center gap-[10px]">
            <Icon name="notification" height={16} width={16} />

            <Icon name="defaultAvatar" fill="#3A3B3F" height={36} width={37} />
            <Text className="text-xs" style={{ color: "#3A3B3F" }}>
              Varun GM
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
