# Decision Tree JSON Structure Documentation

## Overview

This document outlines the structure and format of the JSON file used to define the decision tree for the Interactive Decision Tree web application. The JSON file is composed of several key components that structure the interactive decision-making process.

## JSON Structure

### 1. Root Object

- `title` (string): The title of the decision tree.
- `description` (string): A brief description of the decision tree's purpose.

### 2. Departments Object

An object containing key-value pairs where the key is the department's code, and the value is the department's full name.

```json
"departments": {
    "customer_service":
    {
      "name": "Klantenservice",
      "description": "De klantenservice is het eerste aanspreekpunt voor klanten. Zij helpen klanten met vragen en problemen."
    },
    "technical_support": {
      "name": "Technische ondersteuning",
      "description": "De technische ondersteuning helpt klanten met technische problemen."
    },
    // Etc.
  }
```

### 3. Variables Object

An object to store the values of variables that will be used throughout the decision tree.

```json
"variables": {
  "workOrderNumber":
  {
    "name": "Werkordernummer",
    "value": null
  },
  // Etc.
}
```

### 3. Steps Array

An array of step objects that define the decision tree's flow.

#### Possible properties for step objects

- `id` (string): A unique identifier for the step.
- `description` (string): The question or instruction associated with the step (not applicable for "end" type).
- `type` (string): The type of step ("start", "decision", "input", "action", "end"). This one is really important because it determines what the node will look like.
  - `start`: The first step in the decision tree. This one usually has the `id` of `root`.
  - `decision`: A step that asks the user to make a decision.
  - `input`: A step that asks the user to input a value. This value will be stored in the `variable` property. The `variable` property is required for this type of step.
  - `action`: A step that performs an action.
  - `end`: The last step in the decision tree.
- `options` (array): An array of option objects for decision steps with the following two properties:
  - `value` (string): The text to display for the option.
  - `nextStep` (string): The ID of the next step to proceed to if the user selects this option.
- `variable` (string): The variable to store the user's input (applicable for "input" type).
- `explanation` (string): This one provides additional info for the user, but the content should only be visible when we are in this very step in the process.
- `department` (string): The department code that is responsible for the step.
- `nextStep` (string): The ID of the next step to proceed to after this one.

## Conclusion

The JSON file for the decision tree should be structured as outlined above to ensure compatibility with the "Garantieprocedure" web application. Each step should be meticulously defined to guide the user through the decision-making process.

## Here is a sample JSON file with all the types demonstrated

```json
{
  "title": "Garantieprocedure",
  "description": "Deze beslissingsboom helpt je om te bepalen of een product onder garantie valt.",
  "departments": {
    "customer_service": "Customer Service",
    "warehouse": "Warehouse",
    "workshop": "Workshop"
  },
  "variables": {
    "workOrderNumber": null,
    "repairable": null,
    "warrantyPeriod": null,
    "reckoningPrice": null
  },
  "steps": [
    {
      "id": "root",
      "type": "start",
      "question": "Is het product nog binnen de garantieperiode?",
      "options": [
        {
          "value": "Ja",
          "nextStep": "warrantyPeriod"
        },
        {
          "value": "Nee",
          "nextStep": "end"
        }
      ]
    },
    {
      "id": "warrantyPeriod",
      "type": "decision",
      "question": "Is het product nog binnen de garantieperiode?",
      "options": [
        {
          "value": "Ja",
          "nextStep": "warrantyPeriod"
        },
        {
          "value": "Nee",
          "nextStep": "end"
        }
      ]
    },
    {
      "id": "workOrderNumber",
      "type": "input",
      "description": "Wat is het werkordernummer?",
      "variable": "workOrderNumber",
      "explanation": "Het werkordernummer is te vinden op de werkorder.",
      "department": "workshop",
      "nextStep": "repairable"
    },
    {
      "id": "repairable",
      "type": "decision",
      "description": "Is het product nog binnen de garantieperiode?",
      "options": [
        {
          "value": "Ja",
          "nextStep": "warrantyPeriod"
        },
        {
          "value": "Nee",
          "nextStep": "end"
        }
      ]
    },
    {
      "id": "reckoningPrice",
      "type": "input",
      "description": "Wat is de afrekenprijs?",
      "variable": "reckoningPrice",
      "explanation": "De afrekenprijs is te vinden op de werkorder.",
      "department": "workshop",
      "nextStep": "end"
    },
    {
      "id": "end",
      "type": "end",
      "description": "Het product valt niet onder garantie."
    }
  ]
}
```
