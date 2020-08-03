export default {
  "title": "Vyhledávání",
  "description": "Hledej co můžeš!",
  "type": "object",
  "required": [
    "propertyType"
  ],
  "properties": {
    "propertyType": {
      "type": "string",
      "title": "Typ nemovitosti",
      "default": "Byty",
      "enum": ["Byty", "Domy", "Projekty", "Pozemky", "Komerční", "Ostatní"]
    }
  }
}