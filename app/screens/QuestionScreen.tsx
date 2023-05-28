import React, { FC, useState, useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { View, StyleSheet, Animated, Easing } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Header, Screen, Text } from "app/components" // Import radio button components
import { useStores } from "app/models"
import { colors, spacing } from "app/theme"

interface QuestionScreenProps extends AppStackScreenProps<"Question"> {}

export const QuestionScreen: FC<QuestionScreenProps> = observer(function QuestionScreen({
  navigation,
}) {
  const { quizStore } = useStores()

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    async function fetchQuestions() {
      await quizStore.getQuestions()
      setAnswers(Array(quizStore.questions.length).fill(null))
    }
    fetchQuestions()
  }, [quizStore])

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start()
  }

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()
  }

  useEffect(() => {
    fadeIn()
  }, [currentQuestionIndex])

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = answerIndex
    setAnswers(newAnswers)

    fadeOut()
    setTimeout(() => {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      fadeIn()
    }, 500)
  }

  const handleSubmit = () => {
    console.log(answers, quizStore.questions)
  }

  if (currentQuestionIndex >= quizStore.questions.length) {
    return (
      <Screen
        preset="auto"
        contentContainerStyle={styles.screenContentContainer}
        safeAreaEdges={["top", "bottom"]}
      >
        <Text text="Quiz completed!" />
        <View style={styles.endButtonsView}>
          <Button
            text="Retry quiz"
            style={styles.decisionButtons}
            onPress={() => {
              console.log("Button pressed. Navigating to Question screen...")
              navigation.navigate("Welcome")
            }}
          />
          <Button text="Submit" style={styles.decisionButtons} onPress={handleSubmit} />
        </View>
      </Screen>
    )
  }

  const question = quizStore.questions[currentQuestionIndex]

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Header
        title={`Question ${currentQuestionIndex + 1}`}
        onLeftPress={() => navigation.goBack()}
        safeAreaEdges={[]}
        leftIconColor="white"
        leftIcon="back"
        titleStyle={styles.title}
        containerStyle={styles.header}
        backgroundColor={colors.palette.primary500}
      />
      <Animated.Text style={{ ...styles.question, opacity: fadeAnim }}>
        {question.question}
      </Animated.Text>
      {question.choices.map((choice, choiceIndex) => (
        <Animated.View
          style={{
            ...styles.optionButtonContainer,
            opacity: fadeAnim,
            transform: [
              { translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) },
            ],
          }}
          key={choiceIndex.toString()}
        >
          <Button
            onPress={() => handleAnswer(choiceIndex)}
            text={choice.text}
            style={styles.optionButton}
          />
        </Animated.View>
      ))}
    </Screen>
  )
})

const styles = StyleSheet.create({
  box: {
    height: 200,
    width: "100%",
  },
  button: {
    borderRadius: 15,
    marginTop: 50,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  buttonText: {
    color: colors.palette.neutral100,
    fontSize: 24,
    textAlign: "center",
  },
  decisionButtons: {
    backgroundColor: colors.palette.primary300,
    borderColor: colors.palette.accent300,
    borderRadius: 20,
    marginHorizontal: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  endButtonsView: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.md,
  },
  header: {
    backgroundColor: colors.palette.primary400,
    borderRadius: 30,
  },
  optionButton: {
    backgroundColor: colors.palette.primary300,
    borderRadius: 10,
    width: "80%",
  },
  optionButtonContainer: {
    alignItems: "center",
    marginBottom: spacing.sm,
    width: "100%",
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: spacing.xxl,
    marginTop: spacing.xl,
    textAlign: "center",
  },
  screenContentContainer: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  title: {
    color: colors.palette.neutral100,
  },
})
