
console.log("Kenmare BioQuest app loaded.");

let modal;
let modalContent;

// Map setup
const map = L.map('map').setView([51.87678061471379, -9.575524117425353], 17);
document.getElementById('map').style.position = 'sticky';
document.getElementById('map').style.top = '50px';
document.getElementById('map').style.zIndex = '100';

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Fetch block
fetch('data/bioquest_data_full.json')
  .then(response => response.json())
  .then(data => {
    const species = data.species;
    species.sort((a, b) => a.type.localeCompare(b.type));
    const habitats = data.habitats;

    console.log("Species data loaded:", species);


    let currentType = null;
    const mainContainer = document.createElement('div');
    mainContainer.style.display = 'flex';
    mainContainer.style.flexDirection = 'column';
    mainContainer.style.gap = '40px';
    mainContainer.style.marginTop = '30px';

    let sectionGrid = null;

    species.forEach(species => {
      console.log("Creating marker for:", species.name, species.location);
      if (species.type !== currentType) {
        currentType = species.type;
        const typeSection = document.createElement('div');

        const heading = document.createElement('h2');
        heading.textContent = currentType.charAt(0).toUpperCase() + currentType.slice(1);
        heading.id = `type-${currentType}`;
        typeSection.appendChild(heading);

        sectionGrid = document.createElement('div');
        sectionGrid.style.display = 'grid';
        sectionGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
        sectionGrid.style.gap = '20px';
        typeSection.appendChild(sectionGrid);

        mainContainer.appendChild(typeSection);
      }

      let iconSize = [30, 30];
      if (species.type === "mammal") iconSize = [24, 24];

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="marker-wrapper ${species.rarity === 'rare' ? 'rare' : ''}">
            <img src="images/icons/icon-${species.type}.png" style="width:${iconSize[0]}px; height:${iconSize[1]}px;" />
          </div>
        `,
        iconSize: iconSize,
        iconAnchor: [iconSize[0] / 2, iconSize[1]],
        popupAnchor: [0, -Math.round(iconSize[1] * 0.8)]
      });

      const coords = Array.isArray(species.location)
        ? species.location
        : species.location.split(',').map(Number);
      const marker = L.marker(coords, { icon }).addTo(map);
      marker.bindPopup(`<strong>${species.name}</strong><br>${species.description}`);

      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.id = species.id;
      card.style.border = '1px solid #ccc';
      card.style.padding = '10px';
      card.style.borderRadius = '8px';
      card.style.textAlign = 'center';
      card.style.backgroundColor = '#f9f9f9';

      const img = document.createElement('img');
      img.src = species.image;
      img.alt = species.name;
      img.style.width = '100%';
      img.style.height = 'auto';

      const typeIcon = document.createElement('img');
      typeIcon.src = `images/icons/icon-${species.type}.png`;
      typeIcon.alt = species.type;
      typeIcon.style.width = '24px';
      typeIcon.style.height = '24px';
      typeIcon.style.marginRight = '5px';

      const name = document.createElement('h3');
      name.textContent = species.name;

      const desc = document.createElement('p');
      desc.textContent = species.description;

      card.appendChild(img);
      card.appendChild(typeIcon);
      card.appendChild(name);
      card.appendChild(desc);

      const tagContainer = document.createElement('div');
      tagContainer.style.display = 'flex';
      tagContainer.style.flexWrap = 'wrap';
      tagContainer.style.justifyContent = 'center';
      tagContainer.style.gap = '5px';
      tagContainer.style.marginTop = '10px';

      species.habitats.forEach(habitatId => {
        const habitat = habitats.find(h => h.id === habitatId);
        if (habitat) {
          const tag = document.createElement('span');
          tag.textContent = habitat.name;
          tag.style.backgroundColor = '#eee';
          tag.style.borderRadius = '10px';
          tag.style.padding = '2px 8px';
          tag.style.fontSize = '0.75em';
          tag.style.color = '#333';
          tag.style.border = '1px solid #ccc';
          tagContainer.appendChild(tag);
        }
      });

      card.appendChild(tagContainer);

      // Time of Day Badges
      if (Array.isArray(species.timeOfDay) && species.timeOfDay.length > 0) {
        const timeContainer = document.createElement('div');
        timeContainer.style.display = 'flex';
        timeContainer.style.flexWrap = 'wrap';
        timeContainer.style.justifyContent = 'center';
        timeContainer.style.gap = '5px';
        timeContainer.style.marginTop = '6px';

        species.timeOfDay.forEach(time => {
          const tag = document.createElement('span');
          tag.textContent = time;
          tag.style.backgroundColor = '#e3f2fd';
          tag.style.borderRadius = '10px';
          tag.style.padding = '2px 8px';
          tag.style.fontSize = '0.75em';
          tag.style.color = '#0277bd';
          tag.style.border = '1px solid #81d4fa';
          timeContainer.appendChild(tag);
        });

        card.appendChild(timeContainer);
      }

      // Season Badges
      if (Array.isArray(species.season) && species.season.length > 0) {
        const seasonContainer = document.createElement('div');
        seasonContainer.style.display = 'flex';
        seasonContainer.style.flexWrap = 'wrap';
        seasonContainer.style.justifyContent = 'center';
        seasonContainer.style.gap = '5px';
        seasonContainer.style.marginTop = '6px';

        species.season.forEach(season => {
          const tag = document.createElement('span');
          tag.textContent = season;
          tag.style.backgroundColor = '#f1f8e9';
          tag.style.borderRadius = '10px';
          tag.style.padding = '2px 8px';
          tag.style.fontSize = '0.75em';
          tag.style.color = '#33691e';
          tag.style.border = '1px solid #aed581';
          seasonContainer.appendChild(tag);
        });

        card.appendChild(seasonContainer);
      }

      sectionGrid.appendChild(card);
      console.log("Card created for:", species.name);

      // Modal popup disabled: code removed for cleanup.
    });

    const filterBar = document.createElement('div');
    filterBar.style.position = 'sticky';
    filterBar.style.top = '0';
    filterBar.style.zIndex = '999';
    filterBar.style.backgroundColor = '#fff';
    filterBar.style.padding = '10px';
    filterBar.style.display = 'flex';
    filterBar.style.gap = '10px';
    filterBar.style.flexWrap = 'wrap';
    filterBar.style.justifyContent = 'center';
    filterBar.style.borderBottom = '1px solid #ddd';
    filterBar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';

    const types = [...new Set(species.map(s => s.type))];

    types.forEach(type => {
      const button = document.createElement('button');
      const iconImg = document.createElement('img');
      iconImg.src = `images/icons/icon-${type}.png`;
      iconImg.alt = type;
      iconImg.style.width = '20px';
      iconImg.style.height = '20px';
      iconImg.style.marginRight = '5px';
      button.appendChild(iconImg);

      const label = document.createTextNode(type.charAt(0).toUpperCase() + type.slice(1));
      button.appendChild(label);

      button.style.padding = '6px 12px';
      button.style.border = '1px solid #ccc';
      button.style.borderRadius = '5px';
      button.style.backgroundColor = '#f0f0f0';
      button.style.cursor = 'pointer';
      button.style.fontSize = '0.9em';
      button.onclick = () => scrollToType(type);
      filterBar.appendChild(button);
    });

    // Checkbox filters
    const filterWrapper = document.createElement('div');
    filterWrapper.style.margin = '20px auto';
    filterWrapper.style.textAlign = 'center';
    filterWrapper.style.display = 'flex';
    filterWrapper.style.flexDirection = 'row';
    filterWrapper.style.flexWrap = 'wrap';
    filterWrapper.style.justifyContent = 'center';
    filterWrapper.style.alignItems = 'flex-start';
    filterWrapper.style.gap = '40px';

    // Type Checkboxes
    const typeContainer = document.createElement('div');
    typeContainer.innerHTML = '<strong>Species Type</strong><br>';
    types.forEach(type => {
      const label = document.createElement('label');
      label.style.marginRight = '10px';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = type;
      checkbox.name = 'typeFilter';
      checkbox.style.marginRight = '5px';
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(type.charAt(0).toUpperCase() + type.slice(1)));
      typeContainer.appendChild(label);
    });
    // Shared styling for typeContainer
    typeContainer.style.display = 'flex';
    typeContainer.style.flexDirection = 'column';
    typeContainer.style.alignItems = 'flex-start';
    typeContainer.style.maxHeight = '200px';
    typeContainer.style.overflowY = 'auto';
    typeContainer.style.padding = '10px';
    typeContainer.style.border = '1px solid #ccc';
    typeContainer.style.borderRadius = '5px';
    typeContainer.style.backgroundColor = '#f9f9f9';
    filterWrapper.appendChild(typeContainer);

    // Habitat Checkboxes
    const habitatContainer = document.createElement('div');
    habitatContainer.innerHTML = '<strong>Habitat</strong><br>';
    habitats.forEach(habitat => {
      const label = document.createElement('label');
      label.style.marginRight = '10px';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = habitat.id;
      checkbox.name = 'habitatFilter';
      checkbox.style.marginRight = '5px';
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(habitat.name));
      habitatContainer.appendChild(label);
    });
    // Shared styling for habitatContainer
    habitatContainer.style.display = 'flex';
    habitatContainer.style.flexDirection = 'column';
    habitatContainer.style.alignItems = 'flex-start';
    habitatContainer.style.maxHeight = '200px';
    habitatContainer.style.overflowY = 'auto';
    habitatContainer.style.padding = '10px';
    habitatContainer.style.border = '1px solid #ccc';
    habitatContainer.style.borderRadius = '5px';
    habitatContainer.style.backgroundColor = '#f9f9f9';
    filterWrapper.appendChild(habitatContainer);

    // Clear Filters Button
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear Filters';
    clearButton.style.padding = '6px 12px';
    clearButton.style.border = '1px solid #ccc';
    clearButton.style.borderRadius = '5px';
    clearButton.style.backgroundColor = '#fff';
    clearButton.style.cursor = 'pointer';
    clearButton.style.fontSize = '0.9em';
    clearButton.onclick = () => {
      document.querySelectorAll('input[name="typeFilter"]').forEach(cb => cb.checked = false);
      document.querySelectorAll('input[name="habitatFilter"]').forEach(cb => cb.checked = false);
      applyFilters();
    };
    filterWrapper.appendChild(clearButton);

    document.body.appendChild(filterWrapper);
    document.body.appendChild(filterBar);

    // Insert match counter display just before the mainContainer is appended
    const matchCounter = document.createElement('div');
    matchCounter.id = 'match-counter';
    matchCounter.style.textAlign = 'center';
    matchCounter.style.fontSize = '1em';
    matchCounter.style.marginTop = '10px';
    matchCounter.style.color = '#444';
    mainContainer.appendChild(matchCounter);
    const container = document.createElement('div');
    container.style.margin = '0 auto';
    container.style.maxWidth = '1200px';
    container.style.padding = '0 20px';
    container.appendChild(mainContainer);
    document.body.appendChild(mainContainer);


    function applyFilters() {
      const selectedTypes = Array.from(document.querySelectorAll('input[name="typeFilter"]:checked')).map(cb => cb.value);
      const selectedHabitats = Array.from(document.querySelectorAll('input[name="habitatFilter"]:checked')).map(cb => cb.value);

      types.forEach(type => {
        const section = document.getElementById(`type-${type}`);
        if (!section) return;

        // Use the grid section containing the species cards (the sectionGrid after the heading)
        const cards = section.nextElementSibling ? section.nextElementSibling.querySelectorAll('div.card') : [];
        let anyVisible = false;

        cards.forEach(card => {
          const speciesId = card.dataset.id;
          const speciesData = species.find(s => s.id === speciesId);

          const matchesType = selectedTypes.length === 0 || selectedTypes.includes(speciesData.type);
          const matchesHabitat = selectedHabitats.length === 0 || selectedHabitats.some(h => speciesData.habitats.includes(h));

          let show = true;

          // Enforce AND logic when both filters are active
          if (selectedTypes.length > 0 && selectedHabitats.length > 0) {
            show = selectedTypes.includes(speciesData.type) && selectedHabitats.some(h => speciesData.habitats.includes(h));
          } else {
            show = matchesType && matchesHabitat;
          }

          card.style.display = show ? '' : 'none';
          if (show) anyVisible = true;
        });

        // Hide or show the whole section group (parent of heading and grid)
        if (section.parentElement) {
          section.parentElement.style.display = anyVisible ? '' : 'none';
        }
      });

      // Show a message if no cards are visible
      let allCards = mainContainer.querySelectorAll('div.card');
      let anyVisibleCards = Array.from(allCards).some(card => card.style.display !== 'none');

      // Remove old message if it exists
      let oldMessage = document.getElementById('no-results-message');
      if (oldMessage) oldMessage.remove();

      if (!anyVisibleCards) {
        const message = document.createElement('p');
        message.id = 'no-results-message';
        message.textContent = 'No matching species found.';
        message.style.textAlign = 'center';
        message.style.marginTop = '20px';
        message.style.fontSize = '1.1em';
        message.style.color = '#555';
        document.body.appendChild(message);
      }
      // Live match counter display
      const visibleCards = Array.from(mainContainer.querySelectorAll('div.card')).filter(card => card.style.display !== 'none');
      matchCounter.textContent = `🔍 Showing ${visibleCards.length} matching species`;
    }

    document.querySelectorAll('input[name="typeFilter"]').forEach(cb => cb.onchange = applyFilters);
    document.querySelectorAll('input[name="habitatFilter"]').forEach(cb => cb.onchange = applyFilters);

    applyFilters(); // initialize match counter on load
    // Geolocation logic: show user location with marker and accuracy circle
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const userCoords = [position.coords.latitude, position.coords.longitude];

          const userMarker = L.marker(userCoords, {
            icon: L.divIcon({
              className: 'custom-user-marker',
              html: '<div style="background: #1976d2; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white;"></div>',
              iconSize: [14, 14],
              iconAnchor: [7, 7]
            })
          }).addTo(map);

          const accuracyCircle = L.circle(userCoords, {
            radius: position.coords.accuracy,
            color: '#64b5f6',
            fillColor: '#bbdefb',
            fillOpacity: 0.4
          }).addTo(map);

          map.setView(userCoords, 17);

          // === Toast logic for nearby species ===
          const nearbySpecies = species.filter(sp => {
            const [lat, lng] = Array.isArray(sp.location) ? sp.location : sp.location.split(',').map(Number);
            const distance = map.distance(userCoords, [lat, lng]);
            return distance < 120; // meters
          });

          if (nearbySpecies.length > 0) {
            const toast = document.createElement('div');
            toast.textContent = `👀 Nearby species: ${nearbySpecies.map(s => s.name).join(', ')}`;
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.backgroundColor = '#323232';
            toast.style.color = 'white';
            toast.style.padding = '12px 20px';
            toast.style.borderRadius = '8px';
            toast.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
            toast.style.zIndex = '9999';
            toast.style.fontSize = '0.9em';
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';

            document.body.appendChild(toast);
            setTimeout(() => {
              toast.style.opacity = '1';
            }, 100);

            setTimeout(() => {
              toast.style.opacity = '0';
              setTimeout(() => toast.remove(), 300);
            }, 6000);
          }
        },
        error => {
          console.warn("Geolocation error:", error.message);
          const geoWarning = document.createElement('p');
          geoWarning.textContent = "📍 We couldn't determine your location accurately. Try checking your browser's location settings or connect using a mobile device.";
          geoWarning.style.textAlign = 'center';
          geoWarning.style.marginTop = '20px';
          geoWarning.style.padding = '10px';
          geoWarning.style.backgroundColor = '#fff3cd';
          geoWarning.style.border = '1px solid #ffeeba';
          geoWarning.style.color = '#856404';
          geoWarning.style.borderRadius = '5px';
          geoWarning.style.maxWidth = '600px';
          geoWarning.style.marginLeft = 'auto';
          geoWarning.style.marginRight = 'auto';
          document.body.insertBefore(geoWarning, document.getElementById('map'));
        }
      );
    } else {
      console.warn("Geolocation not supported by this browser.");
    }
  })
  .catch(error => {
    console.error("Error loading species data:", error);
  });

function scrollToType(typeId) {
  const target = document.getElementById(`type-${typeId}`);
  if (target) {
    const offset = 500;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}