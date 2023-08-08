import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { useBlockProps, RichText,MediaPlaceholder, BlockControls,AlignmentToolbar, InspectorControls,MediaReplaceFlow } from '@wordpress/block-editor';
import { isBlobURL, revokeBlobURL } from "@wordpress/blob";
import {Spinner, PanelBody, ToggleControl, ToolbarButton} from "@wordpress/components";
import classNames from "classnames";
import './editor.scss';

export default function Edit({attributes,setAttributes}) {

	const {heading,description,alignment,id,alt,url, leftImage, roundedCorner}= attributes;

	const [blobUrl, setBlobUrl]= useState();

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

	const changeImageRadius=()=>{
		setAttributes({
			roundedCorner:!roundedCorner
		})
	}

	const deleteImage=()=>{
		setAttributes({
			url:undefined,
			id:undefined,
			alt:""
		})
	}

	const classes= classNames({
		"reverse":!leftImage,
		"rounded-corner":roundedCorner
	})

	useEffect(()=>{
		if(!id && isBlobURL(url)) {
			setAttributes({
				alt:"",
				url:undefined
			})
		}
	},[])

	useEffect(()=>{
		if(isBlobURL(url)) {
			setBlobUrl(url)
		} else {
			revokeBlobURL(blobUrl);
			setBlobUrl();
		}

	},[url])

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<ToggleControl
            			label="Is image left?"
            			checked={ leftImage }
           	 			onChange={ changeImagePosition }
        			/>
					<ToggleControl
            			label="Rounded Corner?"
            			checked={ roundedCorner }
           	 			onChange={ changeImageRadius }
        			/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<AlignmentToolbar value={alignment} onChange={changeAlignment}></AlignmentToolbar>
			</BlockControls>

			{url && <BlockControls group="block">
				<MediaReplaceFlow
					name={__("Change image","imageandtext")} 
					onSelect={changeImage}
					onError={(value)=>console.log(value)}
					accept='image/*'
					allowedTypes={["image"]}
					mediaId={id}
					mediaURL={url}/>

				<ToolbarButton onClick={deleteImage}>
					{__("Delete image","imageandtext")}
				</ToolbarButton>
			</BlockControls>
			}

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
