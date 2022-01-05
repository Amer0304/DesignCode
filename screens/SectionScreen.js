import React from "react";
import styled from "styled-components";
import { TouchableOpacity, StatusBar, Linking, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Markdown from "react-native-showdown";
import { PlayIcon } from "../components/Icons";

class SectionScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };

    componentDidMount() {
        StatusBar.setBarStyle("light-content", true);
    }

    componentWillUnmount() {
        StatusBar.setBarStyle("dark-content", true);
    }

    render() {
        const { navigation } = this.props;
        const section = navigation.getParam("section");

        return (
            <ScrollView>
                <Container>
                    <StatusBar hidden />
                    <Cover>
                        <Image source={section.image} />
                        <PlayWrapper>
                            <TouchableOpacity
                                underlayColor="transparent"
                                onPress={() => {
                                    this.props.navigation.navigate("Video");
                                }}
                            >
                                <PlayView>
                                    <PlayIcon style={{ marginLeft: -10 }} />
                                </PlayView>
                            </TouchableOpacity>
                        </PlayWrapper>
                        <Wrapper>
                            <Logo source={section.logo} />
                            <Subtitle>{section.subtitle}</Subtitle>
                        </Wrapper>
                        <Title>{section.title}</Title>
                        <Caption>{section.caption}</Caption>
                    </Cover>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        style={{ position: "absolute", top: 20, right: 20 }}
                    >
                        <CloseView>
                            <Ionicons
                                name="ios-close"
                                size={36}
                                color="#4775f2"
                                style={{ marginTop: -2 }}
                            />
                        </CloseView>
                    </TouchableOpacity>
                    <Content>
                        {/* <WebView
                        source={{ html: section.content + htmlStyles }}
                        scalesPageToFit={false}
                        scrollEnabled={false}
                        ref="webview"
                        onNavigationStateChange={(event) => {
                            if (event.url != "about:blank") {
                                this.refs.webview.stopLoading();
                                Linking.openURL(event.url);
                            }
                        }}
                        /> */}
                        <Markdown
                            markdown={markdown}
                            css={css}
                            scalesPageToFit={false}
                            scrollEnabled={false}
                        />
                    </Content>
                </Container>
            </ScrollView>
        );
    }
}

export default SectionScreen;

const markdown = `
## Document Setup

[Adobe XD](https://www.adobe.com/products/xd.html) uses a super easy and efficient interface, a style that it inherits from the companion application in the [Creative Cloud](https://www.adobe.com/creativecloud.html) package. It provides prototyping tools for different platforms, including websites, mobile phones, tablets, and more.

![Start New Design](https://file.mockplus.com/image/2018/12/b0da4790-e6d9-4e1c-a83c-257ffc339f5d.jpg)

When launching the app, the welcome page provides different standard screen size templates and adds the file size you set yourself. In addition, the welcome page contains a number of resources; these resources can be used as a starting point for learning this application, as well as UI design elements such as iOS and Android mobile devices.In addition, other online resources are available, such as tutorials.
`;

const css = `
* {
    font-family: -apple-system, Roboto; 
    margin: 0;
    padding: 0;
    font-size: 17px; 
    font-weight: normal; 
    color: #3c4560;
    line-height: 24px;
}

h2 {
    font-size: 20px;
    text-transform: uppercase;
    color: #b8bece;
    font-weight: 600;
    margin-top: 50px;
}

p {
    margin-top: 20px;
}

a {
    color: #4775f2;
    font-weight: 600;
    text-decoration: none;
}

strong {
    font-weight: 700;
}

img {
    width: 100%;
    margin-top: 20px;
    border-radius: 10px;
}
`;

const Content = styled.View`
    background: white;
    padding: 20px;
    height: 1000px;
`;

const Container = styled.View`
    flex: 1;
`;

const Cover = styled.View`
    height: 375px;
`;

const Image = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
`;

const Title = styled.Text`
    font-size: 24px;
    color: white;
    font-weight: bold;
    width: 170px;
    position: absolute;
    top: 78px;
    left: 20px;
`;

const Caption = styled.Text`
    color: white;
    font-size: 17px;
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 300px;
`;

const CloseView = styled.View`
    width: 32px;
    height: 32px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.View`
    flex-direction: row;
    position: absolute;
    top: 40px;
    left: 20px;
    align-items: center;
`;

const Logo = styled.Image`
    width: 24px;
    height: 24px;
`;

const Subtitle = styled.Text`
    font-size: 15px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    margin-left: 5px;
    text-transform: uppercase;
`;

const PlayWrapper = styled.View`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -40px;
    margin-left: -40px;
`;

const PlayView = styled.View`
    width: 80px;
    height: 80px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 40px;
    justify-content: center;
    align-items: center;
`;
