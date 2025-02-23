import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
  Alert,
  TextInput,
} from "react-native";
import * as Calendar from "expo-calendar";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CalendarPageScreen() {
  const [calendarId, setCalendarId] = useState(null);
  const [eventTitle, setEventTitle] = useState(""); // Введення заголовка події
  const [eventNotes, setEventNotes] = useState(""); // Введення нотаток
  const [date, setDate] = useState(new Date()); // Дата події
  const [showPicker, setShowPicker] = useState(false);
  // Збереження замітки:
  async function saveNote(note) {
    try {
      const existingNotes = await AsyncStorage.getItem("notes");
      const notes = existingNotes ? JSON.parse(existingNotes) : [];
      notes.push(note);
      await AsyncStorage.setItem("notes", JSON.stringify(notes));
    } catch (error) {
      console.error("Помилка збереження:", error);
    }
  }
  // Отримання всіх заміток:

  async function getNotes() {
    const storedNotes = await AsyncStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  }
  console.log(getNotes());
  // Використання:
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function loadNotes() {
      const savedNotes = await getNotes();
      setNotes(savedNotes);
    }
    loadNotes();
  }, []);
  //////
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        console.log("Here are all your calendars:", calendars);

        if (calendars.length > 0) {
          setCalendarId(calendars[0].id);
        } else {
          const newCalendarID = await createCalendar();
          setCalendarId(newCalendarID);
        }
      } else {
        Alert.alert("Помилка", "Немає доступу до календаря.");
      }
    })();
  }, []);

  async function getDefaultCalendarSource() {
    if (Platform.OS === "ios") {
      const defaultCalendar = await Calendar.getDefaultCalendarAsync();
      return defaultCalendar.source;
    } else {
      return { isLocalAccount: true, name: "Expo Calendar" };
    }
  }

  async function createCalendar() {
    const defaultCalendarSource = await getDefaultCalendarSource();
    try {
      const newCalendarID = await Calendar.createCalendarAsync({
        title: "My Garden Calendar",
        color: "blue",
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: "Garden Notes",
        ownerAccount: "personal",
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      });
      console.log(`New Calendar ID: ${newCalendarID}`);
      return newCalendarID;
    } catch (error) {
      console.error("Error creating calendar:", error);
      Alert.alert("Помилка", "Не вдалося створити календар.");
    }
  }

  async function addEventToCalendar() {
    if (!calendarId) {
      Alert.alert("Помилка", "Календар не знайдено.");
      return;
    }
    if (!eventTitle) {
      Alert.alert("Помилка", "Будь ласка, введіть назву події.");
      return;
    }

    try {
      const eventId = await Calendar.createEventAsync(calendarId, {
        title: eventTitle,
        startDate: date,
        endDate: new Date(date.getTime() + 60 * 60 * 1000), // 1 година
        timeZone: "UTC",
        notes: eventNotes,
        alarms: [{ relativeOffset: -10 }], // Нагадування за 10 хвилин до події
      });
      Alert.alert("Успіх", "Подія додана до календаря!");
      console.log(`Event created: ${eventId}`);
    } catch (error) {
      console.error("Error creating event:", error);
      Alert.alert("Помилка", "Не вдалося додати подію.");
    }
  }

  function showDateTimePicker() {
    setShowPicker(true);
  }

  function onDateChange(event, selectedDate) {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  }

  async function getEvents() {
    if (!calendarId) {
      Alert.alert("Помилка", "Календар не знайдено.");
      return;
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // Отримати події на місяць вперед

    const events = await Calendar.getEventsAsync(
      [calendarId],
      startDate,
      endDate
    );
    console.log("Ось ваші події:", events);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Garden Calendar</Text>

      <TextInput
        style={styles.input}
        placeholder="Назва події"
        value={eventTitle}
        onChangeText={setEventTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Нотатки (необов'язково)"
        value={eventNotes}
        onChangeText={setEventNotes}
      />

      <Button title="Вибрати дату та час" onPress={showDateTimePicker} />
      <Text style={styles.selectedDate}>
        Дата: {date.toLocaleDateString()} {date.toLocaleTimeString()}
      </Text>
      <Button title="Переглянути події" onPress={getEvents} />

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date" // або "time"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShow(false); // приховуємо пікер після вибору
            setDate(currentDate);
          }}
        />
      )}

      <Button title="Додати нагадування" onPress={addEventToCalendar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  selectedDate: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});
