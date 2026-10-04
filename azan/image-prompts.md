# AZAN Global Logistics — image generation prompts

14 images to replace the Obras Cullera stand-ins. Generate at **3:2 landscape,
1536 × 1024 or larger**, save as PNG or JPG into `azan/images/` using the
**exact filename given**, then run from `azan/`:

```
npm install sharp          # once, from the repo root, if it is not there yet
node build/optimise-images.js
```

That converts everything to WebP in `site/assets/img/`.

---

## Append this to every prompt

> cinematic editorial photograph, 3:2 landscape, wide establishing shot, golden
> hour or blue hour light, cool desaturated palette of steel grey, slate blue and
> deep charcoal with warm highlights, high dynamic range, natural 35mm film grain,
> photorealistic, generous clean negative space in the left third of the frame for
> a text overlay, no text, no lettering, no signage, no logos, no brand names,
> no watermarks

## Negative prompt

> text, letters, captions, signage, watermark, logo, brand name, company name,
> national flags, readable license plates, close-up faces, distorted hands,
> extra limbs, cartoon, illustration, 3d render, CGI look, oversaturated colours,
> HDR halo, heavy lens flare, tilt-shift miniature effect, fisheye

## Two rules that matter commercially

1. **No branding on any vehicle or aircraft.** The site states that AZAN does not
   own trucks or aircraft and works through licensed operators. Branded fleet
   imagery would contradict that in a way a client could challenge.
2. **No recognisable country markers** — no flags, no border signs naming a
   country, no readable plates. The site deliberately names no countries beyond
   "Bahrain" and "West Africa".

Images sit under dark overlays on the site, so favour a slightly brighter,
higher-contrast result than looks right on its own.

---

## 1. `az-corridor-road`
*Home hero slide 2 · Land Logistics page hero · Land Logistics gate*

> A wide two-lane trunk road cutting through green West African hill country at
> golden hour, two unmarked white articulated lorries in the middle distance
> heading away from camera, red laterite verges, acacia and savannah vegetation,
> long shadows, warm haze on the horizon, aerial view from a low drone

## 2. `az-port-cranes`
*Home hero slide 1 · Executive Aviation CTA band*

> A deep-water container terminal at dusk, a row of gantry cranes over a
> container ship, stacked containers in muted blues and greys, calm water in the
> foreground reflecting the quay lights, low sun behind the cranes

## 3. `az-yard-night`
*Home hero slide 3 · Coordination accordion · Global Network page hero*

> A large container and trailer yard at night under tall floodlight masts, rows
> of stacked containers receding into the dark, wet tarmac reflecting the lights,
> an unmarked truck moving through frame, cold blue-white light against deep black

## 4. `az-bahrain`
*Home hero slide 4 · About AZAN page hero · Home closing CTA band*

> The Manama skyline in the Kingdom of Bahrain at blue hour seen across the
> water, modern glass towers lit from within, a calm Gulf sea in the foreground,
> deep blue sky with a warm band of light at the horizon, long exposure

## 5. `az-jet-apron`
*Executive Aviation page hero · Executive Aviation gate — highest priority*

> A mid-size business jet parked on an airport apron at dusk, unmarked white
> fuselage, air stairs lowered, apron lights reflecting on the wet concrete,
> the terminal and a line of approach lights blurred in the background, shot from
> a low three-quarter angle

## 6. `az-jet-cabin`
*Executive Aviation page, solutions section*

> The interior cabin of an executive jet, cream leather club seats facing a
> polished wood table, window shades half open with soft evening light coming in,
> a single closed laptop on the table, no people, shallow depth of field

## 7. `az-jet-boarding`
*Executive Aviation page, process section*

> A business traveller in a dark suit, seen from behind at a distance, walking up
> the air stairs of a small unmarked private jet at dusk, a car waiting on the
> apron, warm cabin light spilling from the doorway, discreet and quiet mood

## 8. `az-border`
*West Africa Corridor page, border crossings · Execution accordion*

> A road border crossing post at first light, a queue of unmarked lorries waiting
> at a lifted barrier, a plain concrete control building, a wide dusty apron,
> early sun low behind the queue, no flags and no readable signage

## 9. `az-warehouse`
*West Africa Corridor page, logistics centres*

> The interior of a modern logistics centre, long aisles of racking stacked with
> plain wrapped pallets, a forklift mid-aisle, high roof lights and shafts of
> daylight from clerestory windows, clean concrete floor, cool grey and blue tones

## 10. `az-control-room`
*Control and reporting accordion*

> A logistics operations room at night, three operators seen from behind at a
> curved desk, large wall screens showing abstract route lines and status panels
> with no readable text, low ambient light, blue screen glow against a dark room

## 11. `az-boardroom`
*Structuring accordion · Contact page hero · About CTA band*

> A corporate boardroom on a high floor at dusk, a long dark table, empty leather
> chairs, floor-to-ceiling glass with a Gulf city skyline beyond, warm recessed
> lighting inside against the cool blue of the evening outside, no people

## 12. `az-roadworks`
*West Africa Corridor page hero*

> A new road under construction through African bush country, a graded laterite
> roadbed stretching to the horizon, a roller and an excavator working in the
> middle distance, red earth against green vegetation, late afternoon light,
> aerial view

## 13. `az-inland-market`
*West Africa Corridor closing CTA band*

> An unmarked articulated lorry arriving on the outskirts of a West African
> inland city at golden hour, low commercial buildings and warehouses along the
> road, traffic and activity in the middle distance, dust in the warm air

## 14. `az-route-planning`
*Land Logistics page, sequence section*

> A dark desk surface lit by a single lamp, a large route map spread out with
> shipping documents and a tablet beside it, a pen and reading glasses, no
> readable text on any paper, warm pool of light fading into a dark room,
> shot from directly overhead

---

## After the files land

Drop the 14 files in `azan/images/`, run `node build/optimise-images.js`, and
tell me — I will wire each one into its slot, rebuild the six pages, check the
result at desktop and mobile in both themes, and push.
