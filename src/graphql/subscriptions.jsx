const { gql } = require("@apollo/client");

const SUBSCRIBE_MESSAGES = gql`
	subscription subMessages($userId: ID!) {
		messages(userId: $userId) {
			id
			body
			from
			to
		}
	}
`;

export { SUBSCRIBE_MESSAGES };
