<script setup>
// Packages
import { ref } from 'vue';

// Icons / Components
import { PhGearSix, PhUserGear, PhGithubLogo, PhLockKey, PhSignOut, PhLinkSimple, PhLinkBreak } from '@phosphor-icons/vue';
import BlockquoteNote from '@/components/BlockquoteNote.vue';
import Button from '@/components/buttons/Button.vue';
import PopupOverlay from '@/overlays/popup/PopupOverlay.vue';
import Textbox from '@/components/textbox/Textbox.vue';
import API from '@/utils/API';
import Events from '@/utils/Events';
import ProfileCard from '@/components/ProfileCard.vue';
import GrayLine from '@/components/GrayLine.vue';
import SideButton from '@/components/buttons/SideButton.vue';


let page = ref(0);

function setvalue(num) {
    page.value = num;
}

/*
switch (id) {
    case "github":
        page.value=1;
    break;
    case "privacy":
        page.value=2;
    break;
    default:
        page.value=0;
    break;
}
*/

// logs out then closes the popup - john
function logOut(ClosePopup) {
    if (API.user.loggedIn) {
        API.performLogout();
        ClosePopup();
    }
}

// test
let about_me = 1;

/*
gotta base on working this thing bcz it might require 3 sites due to options...
(idk maybe 1 site is enough if I mess around)

one site is enough - john


Looks like I gotta use v-if, v-else-if n ternary operator stuffs
but I'll keep multiple routes for now as no alts to control the page exists ~ Hikari (t404)


changed so you dont have to change page, removed routing for /settings/{...}, should try implementing hash
*/
//Almost spaghetti html xDDD
// it is - john
</script>
<template>
    <PopupOverlay event="popup-logout">
        <template #content>Are you very sure you want to logout?</template>
        <template #footer="{ ClosePopup }">
            <div class="flex justify-center gap-2">
                <Button type="success" @click="logOut(ClosePopup)">Yes</Button>
                <Button type="error" @click="ClosePopup">Cancel</Button>
            </div>
        </template>
    </PopupOverlay>

    <div class="w-full xl:w-content-width max-h-full mx-auto py-8">
        <div class="flex items-center px-5 py-2">
            <PhGearSix class="size-9" />
            <h1 class="text-2xl font-semibold text-center p-2">Settings</h1>
        </div>
        <GrayLine />
        <div class="flex flex-col md:flex-row max-h-full mx-auto py-3 gap-4">
            <div class="max-w-72 max-md:flex max-md:flex-col max-md:min-w-full w-1/2">
                <SideButton @click="setvalue(0)"
                    :class="`${page === 0 ? 'border-l-accent text-white' : 'border-l-background-2'} w-full`"
                    :icon="PhUserGear" title="General" subtitle="Edit General Settings" />
                <SideButton @click="setvalue(1)"
                    :class="`${page === 1 ? 'border-l-accent text-white' : 'border-l-background-2'} w-full`"
                    :icon="PhGithubLogo" title="Github" subtitle="Link your GitHub Account" />
                <SideButton @click="setvalue(2)"
                    :class="`${page === 2 ? 'border-l-accent text-white' : 'border-l-background-2'} w-full`"
                    :icon="PhLockKey" title="Privacy" subtitle="Edit Account Privacy" />
                <GrayLine />
                <SideButton @click="Events.Emit('popup-logout')" class="border-l-background-2 w-full"
                    buttonStyle="danger" :icon="PhSignOut" title="Logout" subtitle="Log out of your Account" />
            </div>
            <!-- the actual page content -->
            <div class="w-full">
                <div v-if="page === 0">
                    <p class="text-lg pb-2">You may only edit profile pictures and banners in Discord!</p>
                    <!-- i cant be fucked to fix profilecard from getting the flex treatment - john -->
                    <ProfileCard :user="API.user" />
                    <div class="flex flex-col gap-4 pt-4">
                        <div v-if="about_me">
                            <h1 class="text-2xl font-medium pb-1">About Me</h1>
                            <!-- <input class="flex w-full rounded-lg bg-background-1 py-2">
						</input> -->
                            <Textbox placeholder-text="Insert some text here." box-name="aboutme" :simple="true" />
                            <!-- When bio's exist, fetch the data and place with :value="" to autofill the bio in. -->
                        </div>
                        <div class="grid md:grid-cols-2 gap-x-2 gap-y-4">
                            <div>
                                <h1 class="text-2xl font-medium pb-1">Site Language</h1>
                                <div class="flex rounded-xl bg-background-3 p-3 text-lg h-12">
                                    idk
                                </div>
                            </div>
                            <div>
                                <h1 class="text-2xl font-medium pb-1">Date Format</h1>
                                <select name="date_format"
                                    class="flex w-full rounded-xl bg-background-3 p-3 text-lg h-12">
                                    <option value=1></option>
                                </select>
                            </div>
                            <div>
                                <h1 class="text-2xl font-medium pb-1">Site Font Style</h1>
                                <select name="font_style"
                                    class="flex w-full rounded-xl bg-background-3 p-3 text-lg h-12">
                                    <option value="default">Default (Author)</option>
                                    <option value="monospace">Monospace</option>
                                    <option value="sans-serif">Sans Serif</option>
                                    <option value="serif">Serif</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex flex-col items-end">
                            <Button type="success" @click="save_changes">
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
                <div v-else-if="page === 1">
                    <BlockquoteNote title="A tip for you" type="tip">
                        In order to contribute and create articles a GitHub
                        account must be linked. This is so we can receive changes on your behalf.
                    </BlockquoteNote>
                    <p class="text-lg pt-4 pb-1">Github Account</p>
                    <!-- <div class="flex rounded-lg bg-background-1 py-2 px-4">
						<img class="rounded-lg h-12" :src="[github_avatar ?
							github_avatar : '/src/assets/images/avatar.png']" alt="avatar">
						<h1 class="text-2xl font-semibold px-2 py-2">{{ github_username ?
							github_username : "No Github account found." }}</h1>
					</div> -->

                    <!-- replace this shit with a github version - john -->
                    <ProfileCard :user="API.user" />
                    <div class="flex flex-col items-end pt-4" v-if="!github_acc">
                        <Button @click="github_login">
                            Link GitHub Account
                            <PhLinkSimple :size="18"></PhLinkSimple>
                        </Button>
                    </div>
                    <div class="flex-col items-end" v-else>
                        <Button @click="github_logout">
                            Unlink GitHub Account
                            <PhLinkBreak :size="18"></PhLinkBreak>
                        </Button>
                    </div>
                </div>
                <div v-else-if="page === 2">
                    <p class="text-lg">Account Privacy</p>
                </div>
            </div>
        </div>
    </div>
</template>