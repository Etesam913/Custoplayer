---
sidebar_position: 2
---
# Overview

## 🔧  General Properties

The Custoplayer component is compatible with all html5 video attributes. This means that you should be able to attach common video attributes/events like `src`, `preload`, `onTimeUpdate`, and `onPlay` to the Custoplayer component with no problem.


## 📓 Item Properties

Item properties used to customize the video player are all put in the `values` property.

To understand how to customize a video player there is some general vocab which is helpful to understand as seen in the image below:

<img alt="An annotated image of the item containers and item components of the video player." src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs%2Foverview%2Fitem-vocab.jpg'/>

In the above image there are 6 green rectangles. Each rectangle represents a container where you can place a component. The above video uses 6 items, but the package supports a total of 7 items.

The are many components that can be put in a item container. Some of them are `"fullscreenButton2"`, `"volumeButton1"`, `"currentTime"`, and `"progressBar1"`.  Components can be customized using property names that are unique to the component. For example, both the `"currentTime"` and `"duration"` components have a `textColor` property.

If a component name is suffixed with a number like 1 or 2, that means that the component has numerous types. For example, there are two fullscreenButton components, `"fullscreenButton1"` & `"fullscreenButton2"`.

You can go to the bottom of the <a href="/docs/quick-start#-usage">quick start page</a> to see the above example in action with its code.

To learn more about components you can go to the <a href="/docs/components">components page</a>

## 📔 Other Properties

Besides the item properties, there are other properties that can be customized in the `values` object.

1. `controlsBar`
2. `previewTooltip`

These properties do not have to be defined as they have defaults.

### Controls Bar

The controls bar is the bar that contains all the items as shown with the green box in the image below:

<img alt="A dark rectangular bar that contains all the video player items in it." src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs%2Foverview%2Fcontrols-bar.jpg' />

#### Example Code:

```js
values={{
  controlsBar: {
    animate: 'movement',
    barColor: "rgba(28, 28, 28, 0.7)"
  },
}}
```
* The `barColor` property changes the color of the controlsBar.
  * This also changes the default backgroundColor for the previewToolip.
  * Accepts any hex or rgb color code.
* The `animate` property changes how the controlsBar animates.
  * Accepts values of `"opacity"` and `"movement"`.
    * Setting animate to `"opacity"` will do a simple fade in animation.
    * Setting animate to `"movement"` will animate the controls bar from bottom -> up

### Preview Tooltip

The preview tooltip is the tooltip that shows up when hovering
over the progress bar. It shows the currentTime of the video at the hovered progress bar position. The preview tooltip is the component in the green rectangle in the image below:

<img alt="The preview tooltip inside a green rectangle." src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs%2Foverview%2Fpreview-tooltip.jpg' />

#### Example Code
```js
values={{
  previewTooltip: {
    id: 'text',
  },
}}
```

* The `id` property makes the preview tooltip that shows the hovered time appear on progress bar hover.
  * Accepts value of `"text"`
