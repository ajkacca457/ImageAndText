import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText,MediaPlaceholder, BlockControls,AlignmentToolbar, InspectorControls } from '@wordpress/block-editor';
import { isBlobURL } from "@wordpress/blob";
import {Spinner, PanelBody, ToggleControl} from "@wordpress/components";
import classNames from "classnames";
import './editor.scss';

export default function Edit({attributes,setAttributes}) {

	const {heading,description,alignment,id,alt,url, leftImage}= attributes;

	const changeHeading = (newHeading) => {
		setAttributes({ heading: newHeading });
	};

	const changeDescription = (newDescription) => {
		setAttributes({ description: newDescription });
	};

	const changeAlignment=(newAlignment)=>{
		setAttributes({alignment:newAlignment})
	}

	const changeImage=(image)=>{

		if(!image || !image.url) {
			setAttributes({
				id:undefined,
				alt:undefined,
				url:undefined
			});
			return;
		}

		setAttributes({
			id:image.id,
			alt:image.alt,
			url:image.url
		})
	}

	const changeImagePosition=()=>{
		setAttributes({
			leftImage:!leftImage
		})
	}

	const classes= classNames({
		"reverse":!leftImage,
	})



	return (
		<>
			<InspectorControls>
				<PanelBody>
					<ToggleControl
            			label="Is image left?"
            			checked={ leftImage }
           	 			onChange={ changeImagePosition }
        			/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<AlignmentToolbar value={alignment} onChange={changeAlignment}></AlignmentToolbar>
			</BlockControls>

			<div { ...useBlockProps({
				className:classes
			}) }>
				<div className={`image-content ${isBlobURL(url)?"is-loading":""}`}>
					{url && <img src={url} alt={alt} />}
					{isBlobURL(url) && <Spinner/>}
					<MediaPlaceholder
						icon="admin-users"
						onSelect={changeImage}
						onError={(value)=>console.log(value)}
						accept='image/*'
						allowedTypes={["image"]}
						disableMediaButtons={url}
						
					/>
				</div>
				<div className={`content align-${alignment}`}> 
					<RichText tagName='h1' value={heading} onChange={changeHeading} placeholder={__("Title of the block","imageandtext")} />
					<RichText tagName='p' value={description} onChange={changeDescription} placeholder={__("Description of the block","imageandtext")}/>
				</div> 
			</div>
		</>

	);
}
