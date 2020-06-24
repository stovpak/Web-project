import React, { Component } from "react";

export default function UserNameLabel(props) {
  return (
    <p className="text-light font-weight-bolder text-right">{props.name}</p>
  );
}

