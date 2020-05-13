import React from "react";

export function User(props: any): JSX.Element {
    return (
        <div>User: {props.name}; Email: {props.email}</div>
    );
}