import React from "react";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import CourseSection from "../components/CourseSection";
import Courses from "../components/Courses";
import { Dimensions } from "react-native";

let screenWidth = Dimensions.get("window").width;

class CoursesScreen extends React.Component {
    static navigationOptions = { title: "Courses", header: null };

    render() {
        return (
            <Container>
                <ScrollView>
                    <Hero>
                        <Background source={require("../assets/background6.jpg")} />
                        <LinearGradient
                            colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]}
                            style={{ position: "absolute", width: screenWidth, height: 460 }}
                        />
                        <Logo source={require("../assets/logo-xd.png")} />
                        <Caption>12 Sections</Caption>
                        <Title>Adobe XD</Title>
                        <Sections>
                            <SectionScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                {sections.map((section, index) => (
                                    <CourseSection
                                        key={index}
                                        title={section.title}
                                        image={section.image}
                                        progress={section.progress}
                                    />
                                ))}
                            </SectionScrollView>
                        </Sections>
                        <Author>
                            <Avatar source={require("../assets/avatar.png")} />
                            <Name>Taught by John Doe</Name>
                        </Author>
                    </Hero>
                    <Subtitle>Latest Courses</Subtitle>
                    <Courses />
                </ScrollView>
            </Container>
        );
    }
}

export default CoursesScreen;

const Container = styled.View`
    background: #f2f2f2;
`;

const ScrollView = styled.ScrollView`
    width: 100%;
    height: 100%;
`;

const Hero = styled.View`
    height: 460px;
    background: #3c4560;
`;

const Background = styled.Image`
    position: absolute;
    top: -1;
    left: 0;
    width: ${screenWidth};
    height: 460px;
`;

const Logo = styled.Image`
    width: 48px;
    height: 48px;
    margin-top: 50px;
    margin-left: 20px;
    align-self: center;
`;

const Caption = styled.Text`
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    color: #b8bece;
    margin-top: 20px;
    margin-left: 20px;
`;

const Title = styled.Text`
    font-size: 32px;
    color: white;
    font-weight: 600;
    margin-top: 4px;
    margin-left: 20px;
    width: 220px;
`;

const Sections = styled.View`
    margin-top: 20px;
    flex-direction: row;
`;

const SectionScrollView = styled.ScrollView`
    padding: 10px 0;
`;

const Author = styled.View`
    flex-direction: row;
    margin-top: 10px;
    align-items: center;
    margin-left: 20px;
`;

const Avatar = styled.Image`
    width: 22px;
    height: 22px;
    border-radius: 11px;
    background: white;
`;

const Name = styled.Text`
    margin-left: 8px;
    color: #b8bece;
`;

const Subtitle = styled.Text`
    font-size: 15;
    text-transform: uppercase;
    font-weight: 600;
    color: #b8bece;
    margin: 20px 0 0 20px;
`;

const sections = [
    {
        title: "Add and Edit Artboards",
        progress: 0.2,
        image: require("../assets/background7.jpg")
    },
    {
        title: "Create Interactive Prototypes",
        progress: 0.3,
        image: require("../assets/background7.jpg")
    },
    {
        title: "Creating UI Kits",
        progress: 0.9,
        image: require("../assets/background7.jpg")
    },
    {
        title: "Share Prototypes for Review",
        progress: 0.5,
        image: require("../assets/background7.jpg")
    },
    {
        title: "Exporting Assets for Developers",
        progress: 0.1,
        image: require("../assets/background7.jpg")
    }
];
