import React from "react";
import styled from "styled-components";
import Course from "../components/Course";

const Courses = () => (
    <Container>
        {courses.map((course, index) => (
            <Course
                key={index}
                image={course.image}
                title={course.title}
                subtitle={course.subtitle}
                logo={course.logo}
                author={course.author}
                avatar={course.avatar}
                caption={course.caption}
            />
        ))}
    </Container>
);

export default Courses;

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 10px;
`;

const courses = [
    {
        title: "Image Transformation in Photoshop",
        subtitle: "10 sections",
        image: require("../assets/background6.jpg"),
        logo: require("../assets/logo-ps.png"),
        author: "John Doe",
        avatar: require("../assets/avatar.png"),
        caption: "Transform and enhance your images"
    },
    {
        title: "Vector Icons in Illustrator",
        subtitle: "12 sections",
        image: require("../assets/background5.jpg"),
        logo: require("../assets/logo-ai.png"),
        author: "John Doe",
        avatar: require("../assets/avatar.png"),
        caption: "Build a beautiful icon set from scratch"
    },
    {
        title: "Editorial Design with InDesign",
        subtitle: "10 sections",
        image: require("../assets/background7.jpg"),
        logo: require("../assets/logo-id.png"),
        author: "John Doe",
        avatar: require("../assets/avatar.png"),
        caption: "Layout and design for print"
    },
    {
        title: "Animations with After Effects",
        subtitle: "10 sections",
        image: require("../assets/background8.jpg"),
        logo: require("../assets/logo-ae.png"),
        author: "John Doe",
        avatar: require("../assets/avatar.png"),
        caption: "Bring life and excitement to your designs"
    }
];
