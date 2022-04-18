import { gql } from "@apollo/client";

const GET_RANDOM_SOTRY = gql`
  query getRandomStory($lenguage: String!) {
    getRandomStory(lenguage: $lenguage) {
      id
      image {
        encoding
        filename
        mimetype
      }
      title
      publicPublisher
      publisher
      body
      createdAt
    }
  }
`;

const GET_RANDOM_POST = gql`
  query getRandomPost($lenguage: String!) {
    getRandomPost(lenguage: $lenguage) {
      body
      confident
      createdAt
      id
      original
      publicPublisher
      title
      user
      image {
        encoding
        filename
        mimetype
      }
    }
  }
`;

const GET_ANSWERS = gql`
  query ($answeringId: ID!) {
    getComments(answeringId: $answeringId) {
      body
      id
      user
      publicPublisher
      original
      confident
      createdAt
    }
  }
`;

const GET_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      body
      id
      createdAt
      confident
      title
      user
      publicPublisher
      image {
        encoding
        filename
        mimetype
      }
    }
  }
`;

const GET_STORY = gql`
  query getStory($storyId: ID!) {
    getStory(storyId: $storyId) {
      id
      title
      body
      createdAt
      confident
      publicPublisher
      publisher
      image {
        encoding
        filename
        mimetype
      }
    }
  }
`;

const GET_COMMENTS = gql`
  query getComments($answeringId: ID!) {
    getComments(answeringId: $answeringId) {
      body
      id
      user
      publicPublisher
      original
      confident
      createdAt
      answeringTo {
        body
        user
        publicPublisher
      }
      image {
        encoding
        filename
        mimetype
      }
    }
  }
`;

const GET_USER_INFO = gql`
  query getUserInfo($userId: ID!) {
    getUserInfo(userId: $userId) {
      email
      userName
      discusionsSaved {
        id
        title
        createdAt
      }
      storiesSaved {
        id
        title
        createdAt
      }
      biography
      profilePicture {
        encoding
        filename
        mimetype
      }
      banned
    }
  }
`;

const GET_USER_STORIES = gql`
  query getUserStories {
    getUserStories {
      title
      body
      confident
      id
      createdAt
    }
  }
`;

const GET_USER_POSTS = gql`
  query getUSersPosts {
    getUserPosts {
      body
      title
      createdAt
      original
      id
    }
  }
`;

const SHOW_FRIEND_REQUESTS = gql`
  query showFriendRequests {
    showFriendRequests {
      senderName
      senderId
      receiverConf
      requestContext
      receiverName
      receiverId
      createdAt
      receiverConf
    }
  }
`;

const SHOW_PARTICIPANTS = gql`
  query showParticipants($mainPostId: ID!) {
    showParticipants(mainPostId: $mainPostId) {
      userId
      userName
    }
  }
`;

const SHOW_FRIENDS = gql`
  query getFriends {
    showFriends {
      friend1Conf
      friend1Id
      friend1Name
      friend2Conf
      friend2Id
      friend2Name
      lastMessage
    }
  }
`;

const CHECK_IF_BANNED = gql`
  query checkIfBanned {
    checkIfBanned
  }
`;

const SHOW_MESSAGES = gql`
  query ShowMessages {
    showMessages {
      id
      body
      from
      to
    }
  }
`;

const GET_CHATS = gql`
  query getChats {
    getChats {
      id
      name
      lastMessage
    }
  }
`;

const GET_CALLS = gql`
  query getCalls {
    getCalls {
      day
      userName
      userId
      userConf
      partnerName
      partnerId
      partnerConf
      hour
    }
  }
`;

const GET_RANDON_NAMES = gql`
  query {
    getAllRandomNames
  }
`;

export {
  GET_RANDOM_SOTRY,
  GET_RANDOM_POST,
  GET_ANSWERS,
  GET_POST,
  GET_COMMENTS,
  GET_USER_INFO,
  GET_USER_STORIES,
  GET_USER_POSTS,
  GET_STORY,
  SHOW_FRIEND_REQUESTS,
  SHOW_PARTICIPANTS,
  SHOW_FRIENDS,
  CHECK_IF_BANNED,
  SHOW_MESSAGES,
  GET_CHATS,
  GET_RANDON_NAMES,
  GET_CALLS,
};
