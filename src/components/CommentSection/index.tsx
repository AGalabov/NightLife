import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Avatar,
  Caption,
  Card,
  Paragraph,
  Subheading,
} from 'react-native-paper';
import { Comment } from '../../models';

interface CommentSectionProps {
  comments: Comment[];
}

const styles = StyleSheet.create({
  comment: {
    marginTop: 8,
    backgroundColor: 'transparent',
    borderBottomColor: 'white',
    borderBottomWidth: 0.3,
  },
});

type AvatarImageProps = {
  size?: number;
};

// TODO: Profile pictures
const LeftContent = (props: AvatarImageProps) => (
  <Avatar.Image
    {...props}
    source={{
      uri:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    }}
  />
);

function CommentAuthor({ comment }: { comment: Comment }) {
  return <Subheading>{comment.author}</Subheading>;
}

export function CommentSection({ comments }: CommentSectionProps) {
  return (
    <>
      {comments.map((comment, index) => {
        return (
          <Card
            // eslint-disable-next-line react/no-array-index-key
            key={`Comment - ${index}`}
            elevation={0}
            style={styles.comment}>
            <Card.Title
              title={<CommentAuthor comment={comment} />}
              // TODO: Add actual dates
              subtitle={<Caption>October 20th at 10:23am</Caption>}
              left={LeftContent}
            />
            <Card.Content>
              <Paragraph>{comment.comment}</Paragraph>
            </Card.Content>
          </Card>
        );
      })}
    </>
  );
}
