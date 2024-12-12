import * as React from 'react';
import { Flex, TextAreaField, Loader, Text, View, Button } from "@aws-amplify/ui-react"
import { useAIGeneration } from "./client";

export default function App() {
  const [description, setDescription] = React.useState("");
  const [{ data, isLoading }, generateRecipe] =
    useAIGeneration("generateRecipe");

  const handleClick = async () => {
    generateRecipe({ description });
  };

  return (
    <Flex direction="column">
      <Flex direction="row">
        <TextAreaField
          autoResize
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
        />
        <Button onClick={handleClick}>Generate recipe</Button>
      </Flex>
      {isLoading ? (
        <Loader variation="linear" />
      ) : (
        <>
          <Text fontWeight="bold">{data?.name}</Text>
          <View as="ul">
            {data?.ingredients?.map((ingredient) => (
              <View as="li" key={ingredient}>
                {ingredient}
              </View>
            ))}
          </View>
          <Text>{data?.instructions}</Text>
        </>
      )}
    </Flex>
  );
}


import { Authenticator } from "@aws-amplify/ui-react";
import { AIConversation } from '@aws-amplify/ui-react-ai';
import { useAIConversation } from './client';

export default function App() {
  const [
    {
      data: { messages },
      isLoading,
    },
    handleSendMessage,
  ] = useAIConversation('chat');
  // 'chat' is based on the key for the conversation route in your schema.

  return (
    <Authenticator>
      <AIConversation
        messages={messages}
        isLoading={isLoading}
        handleSendMessage={handleSendMessage}
      />
    </Authenticator>
  );
}