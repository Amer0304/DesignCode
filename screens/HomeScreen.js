import React from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  Platform,
} from "react-native";
import styled from "styled-components";
import Card from "../components/Card";
import { NotificationIcon } from "../components/Icons";
import Logo from "../components/Logo";
import Course from "../components/Course";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import Avatar from "../components/Avatar";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ModalLogin from "../components/ModalLogin";
import NotificationButton from "../components/NotificationButton";
import Notifications from "../components/Notifications";

const CardsQuery = gql`
  {
    cardsCollection {
      items {
        title
        subtitle
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        subtitle
        caption
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        content
      }
    }
  }
`;

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU",
      }),
    openLogin: () =>
      dispatch({
        type: "OPEN_LOGIN",
      }),
    openNotif: () =>
      dispatch({
        type: "OPEN_NOTIF",
      }),
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: null,
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
  };

  componentDidMount() {
    StatusBar.setBarStyle("dark-content", true);

    if (Platform.OS == "android") StatusBar.setBarStyle("light-content", true);
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: false,
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5,
        useNativeDriver: false,
      }).start();

      StatusBar.setBarStyle("light-content", true);
    }

    if (this.props.action == "closeMenu") {
      Animated.spring(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: false,
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1,
        useNativeDriver: false,
      }).start();

      StatusBar.setBarStyle("dark-content", true);
    }
  };

  handleAvatar = () => {
    if (this.props.name !== "Stranger") {
      this.props.openMenu();
    } else {
      this.props.openLogin();
    }
  };

  render() {
    return (
      <RootView>
        <Menu />
        <Notifications />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity,
          }}
        >
          <SafeAreaView>
            <ScrollView style={{ height: "100%" }}>
              <TitleBar>
                <TouchableOpacity
                  onPress={this.handleAvatar}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 20,
                  }}
                >
                  <Avatar />
                </TouchableOpacity>
                <Title>Welcome Back</Title>
                <Name>{this.props.name}</Name>
                <TouchableOpacity
                  onPress={() => this.props.openNotif()}
                  style={{ position: "absolute", right: 20, top: 5 }}
                >
                  <NotificationButton />
                </TouchableOpacity>
              </TitleBar>
              <ScrollView
                style={{
                  flexDirection: "row",
                  padding: 20,
                  paddingLeft: 12,
                  paddingTop: 30,
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {logos.map((logo, index) => (
                  <Logo key={index} image={logo.image} text={logo.text} />
                ))}
              </ScrollView>
              <Subtitle>{"Continue Learning".toUpperCase()}</Subtitle>
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                <Query query={CardsQuery}>
                  {({ loading, error, data }) => {
                    if (loading) return <Message>Loading...</Message>;
                    if (error) return <Message>Error...</Message>;

                    // console.log(data.cardsCollection.items);
                    return (
                      <CardsContainer>
                        {cards.map((card, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              this.props.navigation.push("Section", {
                                section: card,
                              });
                            }}
                          >
                            <Card
                              title={card.title}
                              image={card.image}
                              caption={card.caption}
                              logo={card.logo}
                              subtitle={card.subtitle}
                              content={card.content}
                            />
                          </TouchableOpacity>
                        ))}
                      </CardsContainer>
                    );
                  }}
                </Query>
              </ScrollView>
              <Subtitle>{"Popular Courses".toUpperCase()}</Subtitle>
              <CoursesContainer>
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
              </CoursesContainer>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
        <ModalLogin />
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const CoursesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 10px;
`;

const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;

const CardsContainer = styled.View`
  flex-direction: row;
  padding-left: 10px;
`;

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const Container = styled.View`
  background: #f2f2f2;
  flex: 1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const logos = [
  {
    image: require("../assets/logo-xd.png"),
    text: "XD",
  },
  {
    image: require("../assets/logo-ps.png"),
    text: "Photoshop",
  },
  {
    image: require("../assets/logo-ai.png"),
    text: "Illustator",
  },
  {
    image: require("../assets/logo-id.png"),
    text: "InDesign",
  },
  {
    image: require("../assets/logo-ae.png"),
    text: "After Effects",
  },
  {
    image: require("../assets/logo-dw.png"),
    text: "Dreamweaver",
  },
];

const cards = [
  {
    title: "Introduction to Adobe XD",
    image: require("../assets/background1.jpg"),
    subtitle: "Adobe XD",
    caption: "1 of 12 sections",
    logo: require("../assets/logo-xd.png"),
  },
  {
    title: "Interface Basics",
    image: require("../assets/background11.jpg"),
    subtitle: "Adobe XD",
    caption: "2 of 12 sections",
    logo: require("../assets/logo-xd.png"),
  },
  {
    title: "Layout and Layers",
    image: require("../assets/background3.jpg"),
    subtitle: "Adobe XD",
    caption: "3 of 12 sections",
    logo: require("../assets/logo-xd.png"),
  },
  {
    title: "Animation and Interaction",
    image: require("../assets/background4.jpg"),
    subtitle: "Adobe XD",
    caption: "4 of 12 sections",
    logo: require("../assets/logo-xd.png"),
  },
];

const courses = [
  {
    title: "Image Transformation in Photoshop",
    subtitle: "10 sections",
    image: require("../assets/background6.jpg"),
    logo: require("../assets/logo-ps.png"),
    author: "John Doe",
    avatar: require("../assets/avatar.png"),
    caption: "Transform and enhance your images",
  },
  {
    title: "Vector Icons in Illustrator",
    subtitle: "12 sections",
    image: require("../assets/background5.jpg"),
    logo: require("../assets/logo-ai.png"),
    author: "John Doe",
    avatar: require("../assets/avatar.png"),
    caption: "Build a beautiful icon set from scratch",
  },
  {
    title: "Editorial Design with InDesign",
    subtitle: "10 sections",
    image: require("../assets/background7.jpg"),
    logo: require("../assets/logo-id.png"),
    author: "John Doe",
    avatar: require("../assets/avatar.png"),
    caption: "Layout and design for print",
  },
  {
    title: "Animations with After Effects",
    subtitle: "10 sections",
    image: require("../assets/background8.jpg"),
    logo: require("../assets/logo-ae.png"),
    author: "John Doe",
    avatar: require("../assets/avatar.png"),
    caption: "Bring life and excitement to your designs",
  },
];
