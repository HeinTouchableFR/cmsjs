import React from 'react';
import Input from 'components/Form/Input/Input';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import TextArea from 'components/Form/TextArea/TextArea';

export default function Index() {
    const options = [
        {
            key: '1', text: 'mon text', value: '1',
        },
    ];

    return (
        <>
            <div className='sandbox-container'>
                <DarkModeButton />
                <Input
                    onChange={(data) => { console.log(data); }}
                    name='input'
                    label='Mon super input'
                    tip={'Beurrez une plaque allant au four ou recouvrez-la d\'une plaque de silicone. À l\'aide de deux cuillères à soupe ou simplement avec les mains, formez des noix de pâte en les espaçant car elles s\'étaleront à la cuisson.'}
                />
                <Dropdown
                    options={options}
                    onChange={(data) => console.log(data)}
                    name='dropdown'
                    label='Mon super dropdown'
                    iconTip='la-utensil-spoon'
                    tip={'Recouvrir d\'une couche de crème au mascarpone puis répéter l\'opération en alternant couche de biscuits et couche de crème en terminant par cette dernière.'}
                />
                <TextArea
                    onChange={(data) => { console.log(data); }}
                    name='textarea'
                    required
                    label='Mon super textarea'
                    tip={'Dans un autocuiseur, versez 3 cuillères à soupe d\'huile d\'olive. Mettez à chauffer et faites-y dorer les pilons de poulet. Quand ils sont dorés, versez l\'équivalent d\'1 litre d\'eau et ajouter les cubes de bouillon de boeuf, le concentré de tomate, les carottes, navets et tomates, les épices à couscous et l\'harissa.'}
                />
            </div>
        </>
    );
}
