import { gql } from "@apollo/client";

const LOGIN__MUTATION = gql`
  mutation login($email: String!, $password: String!, $lenguage: String!) {
    login(email: $email, password: $password, lenguage: $lenguage) {
      email
      id
      token
      userName
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      email
      id
      token
      userName
    }
  }
`;

const CREATE_STORY_MUTATION = gql`
  mutation createStory(
    $title: String!
    $body: String!
    $confident: Boolean!
    $lenguage: String!
    $image: Upload
  ) {
    createStory(
      title: $title
      body: $body
      confident: $confident
      lenguage: $lenguage
      image: $image
    ) {
      body
      confident
      createdAt
      id
      publicPublisher
      publisher
      title
    }
  }
`;

const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $title: String!
    $body: String!
    $confident: Boolean!
    $lenguage: String!
    $image: Upload
  ) {
    createPost(
      title: $title
      body: $body
      confident: $confident
      lenguage: $lenguage
      image: $image
    ) {
      body
      confident
      createdAt
      id
      original
      publicPublisher
      user
      title
      participants {
        userId
        userName
      }
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $lenguage: String!
    $biography: String
    $userName: String
  ) {
    updateProfile(
      lenguage: $lenguage
      biography: $biography
      userName: $userName
    ) {
      id
      token
    }
  }
`;

const SAVE_STORY = gql`
  mutation saveStory($storyId: ID!) {
    saveStory(storyId: $storyId)
  }
`;

const SAVE_DISCUSION = gql`
  mutation saveDiscusion($discusionId: ID!) {
    saveDiscusion(discusionId: $discusionId)
  }
`;

const DELETE_STORY = gql`
  mutation deleteSory($storyId: ID!) {
    deleteStory(storyId: $storyId)
  }
`;

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const ONBOOK_POST = gql`
  mutation onBookPost($postId: ID!) {
    onBookPost(postId: $postId)
  }
`;

const ONBOOK_STORY = gql`
  mutation onBookStory($storyId: ID!) {
    onBookStory(storyId: $storyId)
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment(
    $postId: ID!
    $body: String!
    $mainPostId: ID!
    $confident: Boolean!
    $lenguage: String!
    $image: Upload
  ) {
    createComment(
      postId: $postId
      body: $body
      mainPostId: $mainPostId
      confident: $confident
      lenguage: $lenguage
      image: $image
    ) {
      body
      confident
      createdAt
      id
      user
      publicPublisher
      original
    }
  }
`;

const SEND_FRIEND_REQUEST = gql`
  mutation sendFriendRequest(
    $senderName: String!
    $receiverId: ID!
    $receiverName: String!
    $requestContext: String!
  ) {
    sendFriendRequest(
      senderName: $senderName
      receiverId: $receiverId
      receiverName: $receiverName
      requestContext: $requestContext
    )
  }
`;

const DENNY_FRIEND_REQUEST = gql`
  mutation denyRequest($senderId: ID!) {
    denyRequest(senderId: $senderId)
  }
`;

const ACCEPT_FRIEND_REQUEST = gql`
  mutation acceptRequest(
    $senderId: ID!
    $senderName: String!
    $receiverName: String!
  ) {
    acceptRequest(
      senderId: $senderId
      senderName: $senderName
      receiverName: $receiverName
    )
  }
`;

const REPORT_USER = gql`
  mutation reportUser($userId: ID!) {
    reportUser(userId: $userId)
  }
`;

const DELETE_FRIEND = gql`
  mutation deleteFriend($userId: ID!) {
    deleteFriend(userId: $userId)
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($body: String!, $to: ID!) {
    sendMessage(body: $body, to: $to) {
      body
      from
      to
    }
  }
`;

const ADD_TO_HISTORY = gql`
  mutation addToHistory($userId: ID!, $userName: String!, $name: String!) {
    addToHistory(userId: $userId, userName: $userName, name: $name)
  }
`;

const LOGIN_WITH_GOOGLE = gql`
  mutation loginWithGoogle(
    $userName: String!
    $password: String!
    $email: String!
  ) {
    loginWithGoogle(userName: $userName, password: $password, email: $email) {
      banned
      biography
      email
      id
      token
      userName
    }
  }
`;

const RECOVER_PASSWORD = gql`
  mutation recoverPassword(
    $email: String!
    $confirmEmail: String!
    $password: String!
    $confirmPassword: String!
    $lenguage: String!
  ) {
    recoverPassword(
      email: $email
      confirmEmail: $confirmEmail
      password: $password
      confirmPassword: $confirmPassword
      lenguage: $lenguage
    )
  }
`;

const FORGOT_PASSWORD_EMAIL = gql`
  mutation forgotPassword($email: String!, $lenguage: String!) {
    forgetPassword(email: $email, lenguage: $lenguage)
  }
`;

const DELETE_PROFILE = gql`
  mutation deleteProfile {
    deleteProfile
  }
`;

const ADD_RANDON_NAME = gql`
  mutation addRandonName($name: String!) {
    addRandonName(name: $name)
  }
`;

export {
  LOGIN__MUTATION,
  REGISTER_MUTATION,
  CREATE_STORY_MUTATION,
  CREATE_POST_MUTATION,
  UPDATE_PROFILE,
  SAVE_STORY,
  SAVE_DISCUSION,
  DELETE_STORY,
  DELETE_POST,
  ONBOOK_POST,
  ONBOOK_STORY,
  CREATE_COMMENT_MUTATION,
  SEND_FRIEND_REQUEST,
  DENNY_FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST,
  REPORT_USER,
  DELETE_FRIEND,
  SEND_MESSAGE,
  ADD_TO_HISTORY,
  LOGIN_WITH_GOOGLE,
  RECOVER_PASSWORD,
  FORGOT_PASSWORD_EMAIL,
  DELETE_PROFILE,
  ADD_RANDON_NAME,
};
