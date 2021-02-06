import React, {useEffect, useState} from "react";
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

export default function Component({ balise, label, tooltip, color }) {
  return (
    <>
      <div
        className="ui labeled circular button menu-button"
        data-tooltip={tooltip}
        data-position="right center"
        data-variation="inverted"
      >
        <div className={`ui button ${color}`}>{balise}</div>
        <a className={`ui basic left pointing label ${color}`}>{label}</a>
      </div>
      <br />
    </>
  );
}

export function ComponentEditor({ element, onElementValeurChange }) {

    const [type, setType] = useState()

    useEffect(function () {
        setType(element.type)
    }, [element])

    return (
        <>
            {type === "titre" &&
                <>
                    <Titre element={element} onElementValeurChange={onElementValeurChange}/>
                </>
            }
            {type === "image" &&
            <>
                {element.type}
            </>
            }
        </>
    );
}

function Titre({element, onElementValeurChange}) {

    const [contenu, setContenu] = useState(element.contenu)

    useEffect(function () {
        if (element.content) {
            setContenu(element.content)
        }

    }, [element])

    const handleChange = function (c) {
        console.log(c)
        onElementValeurChange(element, c)
    }

    const modules = {
        toolbar: [
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            ['link'],
            [{'align': []}],

            ['clean']
        ]
    }
    return( <>
        <ReactQuill value={contenu} onChange={handleChange} modules={modules} />
    </>)
}
