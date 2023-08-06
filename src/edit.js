import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({attributes,setAttributes}) {

	const {heading,description,alignment}= attributes;

	return (
		<p { ...useBlockProps() }>
			{ __( 'Boilerplate – hello from the editor!', 'boilerplate' ) }
		</p>
	);
}
