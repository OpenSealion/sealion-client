const execSync = require('child_process').execSync;
const fs = require('fs-extra');
const path = require('path');

function isInGitRepository () {
    try {
        execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
        return true;
    } catch (e) {
        return false;
    }
}

function isInMercurialRepository () {
    try {
        execSync('hg --cwd . root', { stdio: 'ignore' });
        return true;
    } catch (e) {
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
        } else {
            console.warn('Git 初始化成功但是 .git 目录未找到');
            return false;
        }
    } catch (e) {
        console.warn('Git 仓库初始化失败', e);
        return false;
    }
}

function tryGitCommit (appPath) {
    try {
        execSync('git add -A', { stdio: 'ignore' });
        execSync('git commit -m "feat: Initialize project by using Create SeaLionClient"', {
            stdio: 'ignore'
        });
        return true;
    } catch (e) {
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
        } catch (removeErr) {
            // Ignore.
        }
        return false;
    }
}

module.exports = {
    tryGitInit,
    tryGitCommit
};
