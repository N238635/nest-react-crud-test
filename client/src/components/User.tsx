import React from "react";

export function User(props: any): JSX.Element {
    return (
        <div>User: {props.user.name}; Email: {props.user.email}</div>
    );
}