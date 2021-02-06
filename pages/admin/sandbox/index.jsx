import React from "react";
import { Button } from "semantic-ui-react";
import Component from "../../../components/Component/Component";

export default function Index() {
  //Page a créer ou modifier
  const page = {};
  page.nom = "Ma super Page";
  page.contenu = {};
  page.contenu.dispositions = [];

  return (
    <div>
      <div>
        <div class="ui facebook button">
          <i class="facebook icon"></i>
          Facebook
        </div>
        <br />
        <Button className="menu-button">
          <div className="menu-button-icon">{"<p> "}</div>
          <div className="menu-button-text">Text</div>
        </Button>
        <br />
        <br />
        <Button
          className="menu-button fluid ui button"
          data-inverted=""
          data-tooltip="Les balises <h1> jusqu'à <h6> permettent de créer 
          des titres de moins en moins grand."
          data-position="right center"
          data-variation="wide"
        >
          <div className="menu-button-icon">{"<h1> - <h6> "}</div>
          <div className="menu-button-text">Title</div>
        </Button>
        <br />
        <br />
        <Button className="menu-button">
          <div className="menu-button-icon">{"<img> "}</div>
          <div className="menu-button-text">Image</div>
        </Button>
        <br />
        <br />
        <Button className="menu-button">
          <div className="menu-button-icon">{"<table> "}</div>
          <div className="menu-button-text">Table</div>
        </Button>
        <br />
        <div
          className="ui labeled button"
          tabindex="0"
          data-tooltip="Les balises <h1> jusqu'à <h6> permettent de créer 
        des titres de moins en moins grand."
          data-position="right center"
          data-variation="brown"
        >
          <div class="ui olive button">{"<p> "}</div>
          <a class="ui basic olive left pointing label">Text</a>
        </div>
        <br />
        <br />
        <div
          className="ui labeled circular button"
          tabindex="0"
          data-tooltip="Les balises <h1> jusqu'à <h6> permettent de créer 
        des titres de moins en moins grand."
          data-position="right center"
        >
          <div class="ui oranged-icon button">{"<h1>"}</div>
          <a className="ui basic oranged-text left pointing label">Title</a>
        </div>
        <br />
        <br />
        <Component
          balise="<p>"
          label="Paragraphe"
          hover="Je suis une description"
          color="red"
        />
        <Component
          balise="<h1>"
          label="Title"
          hover="Les balises <h1> jusqu'à <h6> permettent de créer 
                  des titres de moins en moins grand."
          color="orange"
        />
      </div>
    </div>
  );
}
