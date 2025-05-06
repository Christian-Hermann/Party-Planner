// CONSTANTS
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2504-ftb-et-web-ft"; // Make sure to change this!
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// STATE

let events = [];
let selectedEvent;

// EVENTS

async function getEvents() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    events = result.data;
    render();
  } catch (err) {
    console.error(err);
  }
}

async function getEvent(id) {
  try {
    const response = await fetch(`${API}/${id}`);
    const result = await response.json();
    selectedEvent = result.data;
    render();
  } catch (err) {
    console.error(err);
    console.log(result);
  }
}

// COMPONENTS

function eventListItem(event) {
  const $li = document.createElement("li");
  $li.innerHTML = `<a href = "#selected">${event.name}</a>`;
  $li.addEventListener("click", () => getEvent(event.id));
  return $li;
}

function eventList() {
  const $ul = document.createElement("ul");
  const $items = events.map(eventListItem);
  $ul.replaceChildren(...$items);
  return $ul;
}

function eventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "please select an event to learn more";
    return $p;
  }
  const { name, id, date, description, location } = selectedEvent;

  const $event = document.createElement("section");
  $event.classList.add("event");
  $event.innerHTML = `
    <h3>${name} (#${id})</h3>
    <p>${date}</p>
    <p>${description}</p>
    <p>${location}</p>`;
  return $event;
}

// RENDER

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
    <section>
        <h2>Upcoming Parties</h2>
        <eventList></eventList>
    </section>
    <section id="selected">
        <h2>Event Details</h2>
        <eventDetails></eventDetails>
    </section>
    </main>`;

  $app.querySelector("eventList").replaceWith(eventList());
  $app.querySelector("eventDetails").replaceWith(eventDetails());
}

async function init() {
  await getEvents();
  render();
}
init();
