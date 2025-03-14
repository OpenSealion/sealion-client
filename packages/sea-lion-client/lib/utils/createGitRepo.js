const execSync = require('child_process').execSync;
const fs = require('fs-extra');
const path = require('path');
function isInGitRepository() {
    try {
        execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
}
function isInMercurialRepository() {
    try {
        execSync('hg --cwd . root', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
}
function tryGitInit(appPath) {
    try {
        execSync('git --version', { stdio: 'ignore' });
        if (isInGitRepository() || isInMercurialRepository()) {
            return false;
        }
        execSync('git init', { stdio: 'ignore' });
        // 验证 .git 目录是否已创建
        if (fs.existsSync(path.join(appPath, '.git'))) {
            return true;
        }
        else {
            console.warn('Git 初始化成功但是 .git 目录未找到');
            return false;
        }
    }
    catch (e) {
        console.warn('Git 仓库初始化失败', e);
        return false;
    }
}
function tryGitCommit(appPath) {
    try {
        execSync('git add -A', { stdio: 'ignore' });
        execSync('git commit -m "feat: Initialize project by using Create SeaLionClient"', {
            stdio: 'ignore'
        });
        return true;
    }
    catch (e) {
        // We couldn't commit in already initialized git repo,
        // maybe the commit author config is not set.
        // In the future, we might supply our own committer
        // like Ember CLI does, but for now, let's just
        // remove the Git files to avoid a half-done state.
        console.warn('Git commit not created', e);
        console.warn('Removing .git directory...');
        try {
            // unlinkSync() doesn't work on directories.
            fs.removeSync(path.join(appPath, '.git'));
        }
        catch (removeErr) {
            // Ignore.
        }
        return false;
    }
}
module.exports = {
    tryGitInit,
    tryGitCommit
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlR2l0UmVwby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jcmVhdGVHaXRSZXBvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDbkQsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9CLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUU3QixTQUFTLGlCQUFpQjtJQUN0QixJQUFJO1FBQ0EsUUFBUSxDQUFDLHFDQUFxQyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDckUsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDTCxDQUFDO0FBRUQsU0FBUyx1QkFBdUI7SUFDNUIsSUFBSTtRQUNBLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLE9BQU87SUFDdkIsSUFBSTtRQUNBLFFBQVEsQ0FBQyxlQUFlLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMvQyxJQUFJLGlCQUFpQixFQUFFLElBQUksdUJBQXVCLEVBQUUsRUFBRTtZQUNsRCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUUxQyxrQkFBa0I7UUFDbEIsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUU7WUFDM0MsT0FBTyxJQUFJLENBQUM7U0FDZjthQUFNO1lBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0tBQ0o7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFFLE9BQU87SUFDMUIsSUFBSTtRQUNBLFFBQVEsQ0FBQyxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUM1QyxRQUFRLENBQUMsd0VBQXdFLEVBQUU7WUFDL0UsS0FBSyxFQUFFLFFBQVE7U0FDbEIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1Isc0RBQXNEO1FBQ3RELDZDQUE2QztRQUM3QyxtREFBbUQ7UUFDbkQsK0NBQStDO1FBQy9DLG1EQUFtRDtRQUNuRCxPQUFPLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUMzQyxJQUFJO1lBQ0EsNENBQTRDO1lBQzVDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUFDLE9BQU8sU0FBUyxFQUFFO1lBQ2hCLFVBQVU7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDYixVQUFVO0lBQ1YsWUFBWTtDQUNmLENBQUMifQ==