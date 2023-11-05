import styled from "@emotion/styled";

export const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  background-color: #252525;
  background-size: cover;
  background-repeat: repeat;
  background-position: center;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
`;

export const SearchHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const TitleWrapper = styled.h1`
  margin: 0;
  padding-bottom: 30px;
  flex: 1;
  text-align: center;
  font-size: 48px;
  color: #AF0404;
  font-family: "Miriam Mono CLM", monospace;
`;

export const TrackListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #AF0404;
  border-radius: 25px;
  margin: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const TrackTitelWrapper = styled.h2`
  width: 600px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #414141;
  border-radius: 25px;
  margin: 10px;
  padding: 10px;
  font-family: "Miriam Mono CLM", monospace;
`;

export const DeleteButton = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #414141;
  border-radius: 25px;
  margin: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  color: #AF0404; // Textfarbe für das X
  font-weight: bold; // Schriftstärke für das X
`;

export const TrackListItem = styled.li`
  list-style: none; // entfernt Aufzählungszeichen
  width: 500px; // Breite festlegen
  height: 50px; // Höhe festlegen
  display: flex; // Flexbox verwenden, um den Inhalt zu zentrieren
  align-items: center; // Inhalt vertikal zentrieren
  justify-content: left; // Inhalt horizontal zentrieren
  background-color: #414141; // Hintergrundfarbe
  border-radius: 25px; // Ecken abrunden
  margin: 10px; // Außenabstand für alle Seiten
  padding: 10px; // Innenabstand für alle Seiten
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Einen kleinen Schatten hinzufügen
  font-family: "Miriam Mono CLM", monospace;
  font-size: 18px;
  font-weight: bold;
`;

export const CreatePlaylistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #414141;
  border-radius: 25px;
  margin: 20px;
  padding: 20px;

`;

export const StyledInput = styled.input`
  margin: 10px;
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const StyledLabel = styled.label`
  margin: 10px;
`;

export const StyledButton = styled.button`
  margin: 20px;
  padding: 12px 24px;
  border: none;
  background-color: #AF0404;
  color: black;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-family: "Miriam Mono CLM", monospace;
  font-size: 16px;
  &:hover {
    background-color: #FF0000;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-bottom: 100px;
`;


export const SearchResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-items: center;
  align-items: center;
  margin-left: 15px;
  margin-right: 15px;
  gap: 20px;
  
`;

export const MainContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
`;

export const SearchResultsWrapper = styled.div`
  grid-column: 1 / 2;
`;

export const TracklistAndPlaylistWrapper = styled.div`
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TrackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 325px;
`;

export const TrackImage = styled.img`
  width: 200px;
  height: 200px;
`;

export const TrackName = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #AF0404;
`;


export const TrackArtist = styled.div`
  font-weight: bold;
  font-style: italic;
  font-size: 24px;
  color: #AF0404;
`;

export const Button = styled.button`
  background-color: #AF0404;
  font-size: 16px;
  font-family: "Miriam Mono CLM", monospace;
  font-weight: bold;
  width: 100%;
  margin-right: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-radius: 15px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);

  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 2);
    background-color: #FF0000;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  align-self: flex-start;
`

export const LoginButton = styled(Button)`
  width: 200px;
  margin-left: 20px;
`;

export const SearchButton = styled(Button)`
  width: 250px;
  margin-left: 20px;
`;

export const AddButton = styled(Button)`
    width: 80px;
`;

export const Input = styled.input`
  background-color: #AF0404; /* Hintergrundfarbe */
  width: 200px;
  height: 20px;
  color: black; /* Textfarbe */
  padding: 12px 24px; /* Innenabstand */
  font-size: 16px; /* Schriftgröße */
  border: none; /* Kein Rand */
  cursor: pointer; /* Handcursor beim Überfahren */
  border-radius: 50px; /* Abgerundete Ecken */
  transition: background-color 0.3s ease, transform 0.3s ease; /* Animation */
  

  
  &:hover {
    background-color: #FF0000; /* Noch dunklere Hintergrundfarbe */
    transform: scale(1); /* Zurück zur Originalgröße */
`;

export const SearchInput = styled(Input)`
  width: 200px;
`;