"use client";
import { useEffect, useRef, useState } from "react";

import { Box, Input, Button, Text, Heading, VStack } from "@chakra-ui/react";

const Home = () => {
  const [inputText, setInputText] = useState<string>("");
  const [animatedText, setAnimatedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  //アニメーションを適応するテキスト
  const fixedText =
    "こんにちは！すごくいい天気ですね～。こんな日はお出かけしてみてはいかがでしょうか？散歩は体に良いのでとくにおすすめですよ！";

  //タイピングアニメーションの関数
  const typeText = (
    text: string,
    setOutput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const addCharacter = (i: number) => {
      if (i < text.length) {
        setTimeout(() => {
          setOutput((currentText: string) => currentText + text[i]);
          addCharacter(i + 1);
        }, 50); // 速度だよ
      } else {
        setIsLoading(false);
      }
    };
    addCharacter(0);
  };

  const handleStartAnimation = () => {
    setAnimatedText("");
    setIsLoading(true);
    setInputText("");
    typeText(fixedText, setAnimatedText);
  };

  //メモリリークなどの可能性がある場合は、useEffectを使ってクリーンアップする
  //現状の仕様だと、このコンポーネントがアンマウントされることないはずだから、コメントアウト
  // useEffect(() => {
  //   return () => {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, []);

  return (
    <Box
      bg="#f0f2f5"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={8}
    >
      <VStack spacing={8} w="100%" maxW="600px">
        <Box bg="white" p={8} rounded="full" shadow="md" w="100%">
          <Heading as="h2" size="lg" mb={6} color="#4c6ef5">
            <Text as="span" fontSize="30px" color="#4c6ef5">
              チャットみたいなアニメーション
            </Text>
          </Heading>
          <VStack spacing={4} align="flex-start" w="100%">
            <Input
              value={inputText}
              onChange={handleInputChange}
              placeholder="テキストを入力…"
              size="lg"
              p={6}
              w="100%"
              rounded="full"
            />
            <Button
              onClick={handleStartAnimation}
              bg="#4c6ef5"
              color="white"
              size="lg"
              w="auto"
              p={6}
              rounded="full"
              _hover={{ bg: "#3b5bdb" }}
              isDisabled={isLoading}
              alignSelf="flex-start"
            >
              送信
            </Button>
          </VStack>
        </Box>

        <Box
          bg="white"
          p={8}
          rounded="full"
          shadow="md"
          w="100%"
          minH="200px"
          display="flex"
          flexDirection="column"
        >
          <Heading as="h2" size="md" mb={4} color="#4c6ef5">
            チャット欄
          </Heading>
          <Box flex="1" overflowY="auto" p={4} bg="#f0f2f5" rounded="full">
            <Text fontSize="lg" fontFamily="monospace" fontWeight="bold">
              {animatedText}
            </Text>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default Home;
